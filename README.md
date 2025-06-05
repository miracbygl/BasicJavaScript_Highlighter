# Basic JavaScript syntax -Online Lexical ve Syntax Analyzer

![Ekran Görüntüsü](img/img1.PNG)

## Proje Özeti
Bu proje, JavaScript benzeri bir dil için gerçek zamanlı sözdizimi renklendirici ve parser uygulamasıdır. Program, yazılan kodun sözdizimini analiz eder, hataları tespit eder ve kod bloklarını renklendirir.

## Projeye Ait Detaylı rapora bu linkten ulaşabilirsiniz
[Medium Makalesi](https://medium.com/@bayoglumirac7/basic-javascript-syntax-online-lexical-ve-syntax-analyzer-442ab41f34a0)

## Projeyi Denemek İçin Linke Tıklayın
[Basic JavaScript]( https://miracbygl.github.io/BasicJavaScript_Highlighter/)
## Özellikler
- ✨ Gerçek zamanlı sözdizimi renklendirme
- 🔍 Anlık hata tespiti ve raporlama
- 📝 Satır  bazlı hata konumu gösterimi
- 🎨 8 farklı token tipi desteği
- 💬 Yorum satırı desteği

## Teknik Detaylar

### Lexical Analysis
- State Diagram yaklaşımı
- Regular Expressions 
- Token tipleri:
  - Keywords (if, else, while, var, vb.)
  - Identifiers
  - Numbers
  - Operators
  - Punctuation
  - Comments
  - Whitespace(Boşluklar)
  - Strings

### Parser
- Top-Down  Parser
- Desteklenen yapılar:
  - If-else statements
  - While loops
  - Variable declarations
  - Function calls
  - Expressions
  - Comments
## 1. Token Yapısı
```bnf
DIGIT       := [0-9]           # Sayısal karakterler
LETTER      := [a-zA-Z]        # Alfabetik karakterler
IDENTIFIER  := LETTER (LETTER | DIGIT)*  # Değişken/fonksiyon isimleri
NUMBER      := DIGIT+ ('.' DIGIT+)?      # Tam sayı veya ondalık sayı
OPERATOR    := '+' | '-' | '*' | '/' | '=' | '>' | '<' | '>=' | '<=' | '==' | '!='
KEYWORD     := 'if' | 'else' | 'while' | 'for' | 'function' | 'var' | 'return'
```
## 2. Grammar
```bnf
program     := statement*
statement   := ifStmt | whileStmt | assignmentStmt | functionCall
ifStmt      := 'if' '(' expression ')' block ('else' block)?
whileStmt   := 'while' '(' expression ')' block
block       := '{' statement* '}'
expression  := term (('+' | '-') term)*
term        := factor (('*' | '/') factor)*
factor      := NUMBER | IDENTIFIER | '(' expression ')'
```
## 🎨 Token Renkleri

| Token Türü         | Açıklama                   | Renk Adı        | Ek Notlar           |
|--------------------|----------------------------|------------------|----------------------|
| `KEYWORD`          | Anahtar kelimeler          | Mavi             | —                    |
| `STRING`           | Metin sabitleri            | Açık Kahverengi  | —                    |
| `COMMENT`          | Yorum satırları            | Yeşil            | *İtalik*             |
| `NUMBER`           | Sayısal ifadeler           | Açık Yeşil       | —                    |
| `OPERATOR`         | Operatörler                | Pembe            | —                    |
| `IDENTIFIER`       | Değişken isimleri          | Açık Mavi        | —                    |
| `FUNCTION_CALL`    | Fonksiyon çağrıları        | Sarı             | —                    |
| `DELIMITER`        | Noktalama işaretleri       | Turuncu          | —                    |


## Örnek Kullanım

### Yorum satırı desteği

 ![Ekran Görüntüsü](img/img3.PNG)

 ### Farklı operatör ve iç içe yapı desteği

 ![Ekran Görüntüsü](img/img2.PNG)

 ### Detaylı hata raporlama ve satır bazlı geri bildirim
 ![Ekran Görüntüsü](img/img4.PNG)
 
 ## Hata Tespiti
 
Program aşağıdaki hata türlerini tespit edebilir:
- Sözdizimi hataları
- Eksik parantezler
- Geçersiz ifadeler
- Desteklenmeyen anahtar kelimeler
- Eksik noktalı virgülle


## Kullanılan Teknolojiler

- ✅HTML
- ✅JavaScript
- ✅CSS

 

