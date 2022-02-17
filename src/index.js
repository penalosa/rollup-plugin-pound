import getSymbolFromCurrency from 'currency-symbol-map'

function getLexeme(templateSymbol) {
     return {
          text(value) {
               return {
                    type: 'text',
                    value
               }
          },
          currency() {
               return {
                    type: 'currency',
                    value: templateSymbol
               }
          },
          lbrace() {
               return {
                    type: 'lbrace',
                    value: '{'
               }
          },
          rbrace() {
               return {
                    type: 'rbrace',
                    value: '}'
               }
          },
          template() {
               return {
                    type: 'template',
                    value: '`'
               }
          }
     }
}

function* lex(code, templateSymbol) {
     const lexeme = getLexeme(templateSymbol)
     let runningText = ''
     for (const char of code) {
          switch (char) {
               case templateSymbol:
               case '{':
               case '}':
               case '`':
                    if (runningText !== '') {
                         yield lexeme.text(runningText)
                         runningText = ''
                    }
                    switch (char) {
                         case templateSymbol:
                              yield lexeme.currency()
                              break
                         case '{':
                              yield lexeme.lbrace()
                              break
                         case '}':
                              yield lexeme.rbrace()
                              break
                         case '`':
                              yield lexeme.template()
                              break
                    }
                    break
               default:
                    runningText += char
          }
     }
     yield lexeme.text(runningText)
}

export default function currencyPlugin({ currency = "GBP" } = { currency: "GBP" }) {
     if (currency == "USD") {
          throw new Error("No American dollars accepted here!")
     }
     let templateSymbol = getSymbolFromCurrency(currency) ?? '£'

     return {
          name: 'currency-plugin',

          transform(code) {
               let transformed = ''
               let nesting_stack = []
               let last = null
               for (const lexeme of lex(code, templateSymbol)) {
                    switch (lexeme.type) {
                         case 'currency':
                              if (nesting_stack[nesting_stack.length - 1] == 'template') {
                                   transformed += '$'
                              } else {
                                   transformed += lexeme.value
                              }
                              break
                         case 'template':
                              if (nesting_stack[nesting_stack.length - 1] == 'template') {
                                   nesting_stack.pop()
                              } else {
                                   nesting_stack.push('template')
                              }
                              transformed += lexeme.value
                              break

                         case 'rbrace':
                              if (nesting_stack[nesting_stack.length - 1] == 'lbrace') {
                                   nesting_stack.pop()
                              }
                              transformed += lexeme.value
                              break
                         case 'lbrace':
                              if (last?.type == 'currency' && nesting_stack[nesting_stack.length - 1] == 'template') {
                                   nesting_stack.push('lbrace')
                              }
                              transformed += lexeme.value
                              break
                         default:
                              transformed += lexeme.value
                    }
                    last = lexeme
               }
               return transformed
          },

     };
}
