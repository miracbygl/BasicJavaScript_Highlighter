/*
Formal Language Description:

Tokens:
DIGIT       := [0-9]
LETTER      := [a-zA-Z]
IDENTIFIER  := LETTER (LETTER | DIGIT)*
NUMBER      := DIGIT+ ('.' DIGIT+)?
OPERATOR    := '+' | '-' | '*' | '/' | '=' | '>' | '<' | '>=' | '<=' | '==' | '!='
KEYWORD     := 'if' | 'else' | 'while' | 'for' | 'function' | 'var' | 'return'
WHITESPACE  := [ \t\n\r]+
COMMENT     := '//' [^\n]*

Grammar:
program     := statement*
statement   := ifStmt | whileStmt | assignmentStmt | functionCall
ifStmt      := 'if' '(' expression ')' block ('else' block)?
whileStmt   := 'while' '(' expression ')' block
block       := '{' statement* '}'
expression  := term (('+' | '-') term)*
term        := factor (('*' | '/') factor)*
factor      := NUMBER | IDENTIFIER | '(' expression ')'
*/



// Token tipleri 
const TokenTypes = {
    KEYWORD: "keyword",
    IDENTIFIER: "identifier",
    NUMBER: "number",
    STRING: "string",
    OPERATOR: "operator",
    PUNCTUATION: "noktalama",
    COMMENT: "comment",
    WHITESPACE: "bosluk",
    ERROR: "error"
};


const keywords = ["if", "return", "var", "else","function", "while", "for","let"];

const operators = ["+", "-", "*", "/", "=", ">", "<", ">=",  "==", "!=","<="];
const noktalama = ["(", ")", "{", "}", ";", ",", "[", "]"];

const codeInput = document.getElementById("codeInput");

const highlightedOutput = document.getElementById("highlightedOutput");

const parseResult = document.getElementById("parseResult");


function tokenize(kod) {
  // Tokenları tutacak dizi
  const tokenDizisi = [];
  
  // Kod içinde ilerlemek için değişkenler
  let konum = 0;
  let satir = 1;
  //let sutun = 1;

  // Token ekleme yardımcı fonksiyonu
  function tokenEkle(tip, deger, uzunluk = deger.length) {
    tokenDizisi.push({
      type: tip,
      value: deger,
      line: satir,
      
    });
  }

  // Tüm kodu tara
  while (konum < kod.length) {
    let karakter = kod[konum];

    // 1. Alt satıra geçiş kontrolü
    if (karakter === '\n') {
      satir++;
      
      konum++;

      continue;
    }

    // 2. Yorum satırı kontrolü
    if (karakter === '/' && kod[konum + 1] === '/') {
      let yorum = '';
      konum += 2; // // işaretlerini atla
      
      // Satır sonuna kadar oku
      while (konum < kod.length && kod[konum] !== '\n') {
        yorum += kod[konum];
        konum++;
      }
      tokenEkle(TokenTypes.COMMENT, '//' + yorum);
      continue;
    }

    // 3. Boşluk karakteri kontrolü
    if (karakter === ' ' || karakter === '\t' || karakter === '\r') {
      let bosKarakter = '';
      
      while (konum < kod.length && /\s/.test(kod[konum])) {
        bosKarakter += kod[konum];
        
        if (kod[konum] === '\n') {
          satir++;
          //sutun = 1;
        } else {
          //sutun++;
        }
        konum++;
      }
      tokenEkle(TokenTypes.WHITESPACE, bosKarakter);
      continue;
    }

    // 4. Değişken veya anahtar kelime kontrolü
    if (/[a-zA-Z_]/.test(karakter)) {
      let kelime = '';
      
      while (konum < kod.length && /[a-zA-Z0-9_]/.test(kod[konum])) {
        kelime += kod[konum];
     konum++;
        //sutun++;
      }
      
      // Anahtar kelime mi değişken mi?
      let tip = keywords.includes(kelime) ? TokenTypes.KEYWORD : TokenTypes.IDENTIFIER;
  tokenEkle(tip, kelime);
      continue;
    }

    // 5. Sayı kontrolü
    if (/[0-9]/.test(karakter)) {
    let sayi = '';
      
      while (konum < kod.length && /[0-9.]/.test(kod[konum])) {
      sayi += kod[konum];
          konum++;
       
      }
      tokenEkle(TokenTypes.NUMBER, sayi);

      continue;
    }

    // 6. Operatör kontrolü
    if (operators.includes(karakter)) {
      let sonrakiKarakter = kod[konum + 1];
      let ikiKarakter = karakter + sonrakiKarakter;
      
      // İki karakterli operatör mü? (>=, <=, ==, !=)
      if (operators.includes(ikiKarakter)) {
        tokenEkle(TokenTypes.OPERATOR, ikiKarakter);
        konum += 2;
       // sutun += 2;
      } else {
        tokenEkle(TokenTypes.OPERATOR, karakter);
        konum++;
       // sutun++;
      }
      continue;
    }

    // 7. Noktalama işareti kontrolü
    if (noktalama.includes(karakter)) {
      tokenEkle(TokenTypes.PUNCTUATION, karakter);
      konum++;
      //sutun++;
      continue;
    }

    // 8. Tanınmayan karakter
    tokenEkle(TokenTypes.ERROR, karakter);
    konum++;
   // sutun++;
  }

  return tokenDizisi;
}

//  Parser (Top-Down Parsing)
function parse(tokens) {
  let konum = 0;

  function peek() {
    return tokens[konum];
  }

  function tokenCheck(bekTip, bekValue = null) {
    const token = tokens[konum];
    if (!token || token.type === "error") {
      throw new Error("Beklenmeyen kod sonu");
    }
    if (token.type !== bekTip) {
      throw new Error("Hatalı token: " + token.value);
    }
    if (bekValue !== null && token.value !== bekValue) {
      throw new Error("Hatalı değer: " + token.value);
    }
    konum++;
    return token;
  }

  function parseProgram() {
    while (konum < tokens.length) {
      parse_statement();
    }
  }

  // parseStatement fonksiyonunu 
function parse_statement() {
    const token = peek();
    if (!token) return;

    if (token.type === TokenTypes.KEYWORD) {
        switch(token.value) {
            case "if":
              parseIfStatement();
                  break;
            case "while":
              parseWhileStatement();
                 break;
            case "var": 
                 parseVariableDeclaration();
                break;
            default:
              throw new Error("Desteklenmeyen keyword: " +  token.value);
        }
    } else if (token.type === TokenTypes.IDENTIFIER) {
        const next = tokens[konum + 1];
        if (next && next.type === TokenTypes.OPERATOR && next.value === "=") {
            parseAssignment();
        } else if (next && next.type === TokenTypes.PUNCTUATION && next.value === "(") {
            parseFunctionCall();
        } else {
            throw new Error("Beklenmeyen ifade");
        }
    } else {
        throw new Error("Geçersiz ifade");
    }
}

function parseVariableDeclaration() {
    tokenCheck(TokenTypes.KEYWORD, "var");
    tokenCheck(TokenTypes.IDENTIFIER);
    tokenCheck(TokenTypes.OPERATOR, "=");
    parseExpression();
    tokenCheck(TokenTypes.PUNCTUATION, ";");
}


    // parseIfStatement fonksiyonunu    
function parseIfStatement() {
    try {
        // 'if' keyword'ünü kontrol et
        tokenCheck(TokenTypes.KEYWORD, "if");
        
        // Açılış parantezi kontrolü
        if (!peek() || peek().type !== TokenTypes.PUNCTUATION || peek().value !== "(") {
            throw new Error("'if' ifadesinden sonra '(' bekleniyor");
        }
        tokenCheck(TokenTypes.PUNCTUATION, "(");
        
        // İfadeyi parse et
        parseExpression();
        
        // Kapanış parantezi kontrolü
        if (!peek() || peek().type !== TokenTypes.PUNCTUATION || peek().value !== ")") {
            throw new Error("İfade sonunda ')' bekleniyor");
        }
        tokenCheck(TokenTypes.PUNCTUATION, ")");
        
        // Blok başlangıcı kontrolü
        if (!peek() || peek().type !== TokenTypes.PUNCTUATION || peek().value !== "{") {
            throw new Error("İfade sonunda '{' bekleniyor");
        }
        tokenCheck(TokenTypes.PUNCTUATION, "{");
        
        // Statement listesini parse et
        parseStatementList();
        
        // Blok kapanışı kontrolü
        if (!peek() || peek().type !== TokenTypes.PUNCTUATION || peek().value !== "}") {
            throw new Error("Blok sonunda '}' bekleniyor");
        }
        tokenCheck(TokenTypes.PUNCTUATION, "}");
        
        // Opsiyonel else bloğu
        const nextToken = peek();
        if (nextToken && nextToken.type === TokenTypes.KEYWORD && nextToken.value === "else") {
            tokenCheck(TokenTypes.KEYWORD, "else");
            if (!peek() || peek().type !== TokenTypes.PUNCTUATION || peek().value !== "{") {
                throw new Error("'else' ifadesinden sonra '{' bekleniyor");
            }
            tokenCheck(TokenTypes.PUNCTUATION, "{");
            parseStatementList();
            if (!peek() || peek().type !== TokenTypes.PUNCTUATION || peek().value !== "}") {
                throw new Error("'else' bloğu sonunda '}' bekleniyor");
            }
            tokenCheck(TokenTypes.PUNCTUATION, "}");
        }
    } catch (e) {
        throw new Error("if staments hatası: " + e.message);
    }
}

  // parseWhileStatement fonksiyonunu
function parseWhileStatement() {
    tokenCheck(TokenTypes.KEYWORD, "while");
    tokenCheck(TokenTypes.PUNCTUATION, "(");
    parseExpression();
    tokenCheck(TokenTypes.PUNCTUATION, ")");
    tokenCheck(TokenTypes.PUNCTUATION, "{");
    parseStatementList();
    tokenCheck(TokenTypes.PUNCTUATION, "}");
} 


  function parseStatementList() {
    while (konum < tokens.length) {
        const token = peek();
        if (!token || (token.type === TokenTypes.PUNCTUATION && token.value === "}")) 
          
          break;
        parse_statement();
    }
  }

  function parseAssignment()
  
  {
  tokenCheck("identifier");
      tokenCheck("operator", "=");
  parseExpression();
    tokenCheck("noktalama", ";");
  }

 
function parseFunctionCall() {
    // Fonksiyon adı
    const funcName = tokenCheck(TokenTypes.IDENTIFIER);
    
    // Açılış parantezini kontrol 
    tokenCheck(TokenTypes.PUNCTUATION, "(");
    
    // İsteğe bağlı parametreleri kontrol 
    while (konum <  tokens.length) {
        const token = peek();

        if (token.type === TokenTypes.PUNCTUATION && token.value === ")") {
            break;
        }


        parseExpression();
        
    }
    
    // Kapanış parantezini kontrol et
    tokenCheck(TokenTypes.PUNCTUATION, ")");
    
    // Noktalı virgülü kontrol et
    tokenCheck(TokenTypes.PUNCTUATION, ";");
}

  function parseExpression() {
    
    const token = peek();

    if (token.type === "identifier" || token.type === "number") {
      tokenCheck(token.type);
      if (konum < tokens.length && tokens[konum].type === "operator") {
        tokenCheck("operator");
        const next = peek();
        if (next.type === "identifier" || next.type === "number") {
          tokenCheck(next.type);
        } else {
          throw new Error("Geçersiz ifade");
        }
      }
    } else {
      throw new Error("Geçersiz ifade");
    }
  }

  try {
    parseProgram();
    if (konum !== tokens.length) throw new Error("Kodun tamamı işlenmedi");
    return { success: true, message: "Kod geçerli." };
  } catch (e) {
    return { success: false, message: e.message };
  }
}

function render() {
  const code = codeInput.value;
  const tokens = tokenize(code);
  const lines = code.split('\n');

  
  let html = '';
  
  lines.forEach((line, index) => {
    
    html += `<div class="line">
      <span class="line-number">${index + 1}</span>
      <span class="line-content">`;
    
    
    const lineTokens = tokens.filter(t => t.line === index + 1);
    
    lineTokens.forEach(token => {
      if (token.type === TokenTypes.WHITESPACE) {
        html += token.value.replace(/ /g, '&nbsp;');
      } else {
        html += `<span class="${token.type}">${escapeHtml(token.value)}</span>`;
      }
    });
    
    html += '</span></div>';
  });
  
  highlightedOutput.innerHTML = html;

  // Parsing için yorum ve whitespace tokenlarını filtrele
  const codeTokens = tokens.filter(t => 
    t.type !== TokenTypes.WHITESPACE && 
    t.type !== TokenTypes.COMMENT
  );
  
  
  const result = parse(codeTokens);
  
  if (!result.success) {
    // Hata konumunu bulmak için orijinal token listesinde ara
    const errorToken = codeTokens[result.errorPos] || codeTokens[codeTokens.length - 1];
    
    parseResult.innerHTML = `
      <div class="error">
        <div class="error-header">
          <span class="error-type">Syntax Error:</span>
          <span class="error-location">Satır ${errorToken.line}</span>
        </div>
        <div class="error-message">${result.message}</div>
        <div class="error-code">
          ${lines[errorToken.line - 1]}
         
        </div>
      </div>
    `;
  } else {
    parseResult.innerHTML = `
      <div class="success">
        
        <span class="success-message">Syntax Doğru</span>
      </div>
    `;
  }
}


function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}


codeInput.addEventListener('input', render);

// 
highlightedOutput.innerHTML = '';




parseResult.textContent = 'Kodu yazmaya başlayın...';