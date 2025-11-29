# 포트폴리오 수정 가이드 (ASSETS & STYLE GUIDE)

이 문서는 포트폴리오의 각 섹션(Intro, Paper, Contact)을 수정하는 방법과 디자인(글씨체 등)을 변경하는 방법을 설명합니다.

---

## 1. 섹션별 수정 방법

### 1.1 Intro (자기소개) 섹션
**수정할 파일:**
- 내용 수정: `src/data/profile.json`
- 디자인/구조 수정: `src/components/Introduction.jsx`

**프로필 사진 변경 방법:**
1. 사용할 사진 파일(예: `me.jpg`)을 `src/assets/` 폴더에 넣으세요.
2. `src/components/Introduction.jsx` 파일을 열고 아래와 같이 수정하세요.

```javascript
// 상단 import 부분에 추가
import profileImg from '../assets/me.jpg'; 

// 컴포넌트 내부 img 태그 수정
<img src={profileImg} alt={profileData.name} className="profile-photo" />
```

**텍스트 내용 변경:**
`src/data/profile.json` 파일을 열어 이름, 소속, 관심사 등을 직접 수정하면 됩니다.

### 1.2 Papers (논문 목록) 섹션
**수정할 파일:**
- 논문 데이터: `src/data/papers.json`
- 디자인/구조 수정: `src/components/PaperList.jsx`

**논문 추가/수정 방법:**
`src/data/papers.json` 파일에 새로운 항목을 추가하거나 기존 항목을 수정하세요.
```json
{
  "id": 4,
  "title": "새로운 논문 제목",
  "authors": "저자 목록",
  "venue": "CVPR 2025",
  "type": "International", // 필터링에 사용됨 (International, Domestic, Demo, Poster)
  "link": "논문 링크 URL",
  "teaser": "/papers/teaser1.jpg" // (선택사항) 티저 이미지 경로
}
```

**티저 이미지 넣는 법:**
1. `public/papers/` 폴더를 만들고 이미지를 넣으세요 (예: `teaser1.jpg`).
2. 위 JSON 예시처럼 `"teaser": "/papers/teaser1.jpg"`라고 적으면 됩니다. (`/`로 시작하면 public 폴더를 가리킵니다)

### 1.3 Contact (하단) 섹션
**수정할 파일:**
- 링크 데이터: `src/data/links.json`
- 디자인/구조 수정: `src/components/Footer.jsx`

`src/data/links.json` 파일에서 GitHub, LinkedIn, CV 링크 주소를 본인 것으로 변경하세요.

---

## 2. 디자인 및 글씨체 수정 방법

모든 스타일은 `src/styles/main.css` 파일에 모여 있습니다.

### 2.1 글씨체(Font) 변경
현재는 구글 폰트인 'Inter'를 사용 중입니다.

1. **폰트 가져오기:** [Google Fonts](https://fonts.google.com/)에서 원하는 폰트를 고른 후 `<link>` 태그를 복사하세요.
2. **HTML에 추가:** `index.html` 파일의 `<head>` 태그 안에 복사한 코드를 붙여넣으세요.
3. **CSS 적용:** `src/styles/main.css` 파일의 맨 위 `:root` 변수를 수정하세요.

```css
:root {
  /* ... 다른 변수들 ... */
  --font-main: '원하는 폰트 이름', sans-serif; 
}
```

### 2.2 랙(Rack) 라벨 스타일 수정
랙 옆에 붙어 있는 "INTRO", "PAPERS" 글씨 스타일을 바꾸려면 `src/styles/main.css`에서 `.rack-label` 클래스를 찾으세요.

```css
.rack-label {
  /* 위치 조정 */
  right: 45px; 
  
  /* 폰트 스타일 */
  font-size: 0.9rem; /* 글자 크기 */
  font-family: 'Inter', sans-serif; /* 폰트 종류 */
  color: var(--accent-color); /* 글자 색상 */
  letter-spacing: 2px; /* 자간 (글자 사이 간격) */
}
```

이 값들을 조정하여 원하는 느낌으로 바꿀 수 있습니다.
