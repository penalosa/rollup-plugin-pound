
function getLexeme() {
     return {
          text(value) {
               return {
                    type: 'text',
                    value
               }
          },
          pound() {
               return {
                    type: 'pound',
                    value: '£'
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

function* lex(code) {
     const lexeme = getLexeme()
     let runningText = ''
     for (const char of code) {
          switch (char) {
               case '£':
               case '{':
               case '}':
               case '`':
                    if (runningText !== '') {
                         yield lexeme.text(runningText)
                         runningText = ''
                    }
                    switch (char) {
                         case '£':
                              yield lexeme.pound()
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

export default function poundPlugin() {

     return {
          name: 'pound-plugin',

          transform(code) {
               let transformed = ''
               for (const lexeme of lex(code)) {
                    switch (lexeme.type) {
                         case 'pound':
                              transformed += '$'
                              break
                         default:
                              transformed += lexeme.value
                    }
               }
               return transformed
          },

     };
}
