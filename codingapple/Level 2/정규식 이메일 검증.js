// 'a'.includes('abcd') // false
// 'abcd'.includes('a') // true

// // Path: codingapple\Level 2\정규식 이메일 검증.js

// /abc/.test('abcd') // true
// /a/.test('abcd') // true
// /[a-d]/.test('aefg') // true
// /[가-다]/.test('가나다라') // true

// /[a-zA-Z]/.test('반가워요') // false
// /[a-zA-Z]/.test('반가워요a') // true
// /[ㄱ-ㅎ가-힣ㅏ-ㅣ]/.test('반가워요') // true

// /\S/.test('abcde') // true --> \S는 특수문자 포함 아무문자 1개라는 뜻
// /^a/.test('abcde') // true --> ^a는 a로 시작하는지
// /e$/.test('abcde') // true --> e$는 e로 끝나는지

// /\S+@\S+\.\S+/ // 이메일
