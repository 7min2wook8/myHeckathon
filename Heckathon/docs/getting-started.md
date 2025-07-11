# React & Next.js 시작 가이드

이 문서는 React와 Next.js를 처음 접하는 분들을 위해 작성되었습니다. 우리 프로젝트의 코드를 이해하는 데 필요한 핵심 개념들을 쉽게 설명합니다.

## 1. React: UI를 만드는 똑똑한 블록 놀이

React는 웹사이트의 사용자 인터페이스(UI)를 만드는 데 사용되는 자바스크립트 라이브러리입니다. 레고 블록처럼, 작고 재사용 가능한 UI 조각들을 만들어 조합하는 방식으로 웹 페이지를 만듭니다.

### 컴포넌트 (Component): 재사용 가능한 UI 블록

React의 모든 것은 **컴포넌트**라는 단위로 만들어집니다. 예를 들어, 우리 프로젝트의 `header.tsx`, `footer.tsx`, `button.tsx` 파일은 각각 하나의 컴포넌트입니다.

- **Header 컴포넌트**: 웹사이트 상단의 로고, 메뉴 등을 포함합니다.
- **Button 컴포넌트**: 클릭할 수 있는 버튼입니다.

이렇게 만들어진 컴포넌트는 여러 페이지에서 몇 번이고 다시 사용할 수 있습니다. 똑같은 코드를 반복해서 작성할 필요가 없어 매우 효율적입니다.

### Props: 컴포넌트에 지시사항 전달하기

**Props** (속성)는 부모 컴포넌트가 자식 컴포넌트에게 정보를 전달하는 방법입니다. 마치 함수에 인자를 전달하는 것과 같습니다. Props를 사용하면 같은 컴포넌트라도 다른 모습이나 기능을 갖게 만들 수 있습니다.

**예시:**
`Button` 컴포넌트가 있다고 상상해 보세요. 이 버튼의 텍스트를 "확인" 또는 "취소"로 다르게 보여주고 싶을 때 Props를 사용합니다.

```jsx
// "확인" 버튼 만들기
<Button text="확인" />

// "취소" 버튼 만들기
<Button text="취소" />
```

여기서 `text`가 바로 Prop입니다. `Button` 컴포넌트는 `text` Prop으로 받은 값에 따라 다른 글자를 표시하게 됩니다.

### State와 Hook: 컴포넌트의 기억 장치

**State**는 컴포넌트가 스스로 기억하는 데이터입니다. 예를 들어, 모바일 메뉴가 열려 있는지 닫혀 있는지, 사용자가 로그인했는지 여부 등을 기억하는 데 사용됩니다.

**Hook**은 State와 같은 React의 특별한 기능들을 "걸어서(hook)" 사용할 수 있게 해주는 함수입니다. Hook은 항상 `use`로 시작하는 이름을 가집니다.

- **`useState`**: 컴포넌트에 State(기억 장치)를 추가하는 가장 기본적인 Hook입니다. `header.tsx`에서 모바일 메뉴의 열림/닫힘 상태를 기억하기 위해 사용되었습니다.
- **`useEffect`**: 컴포넌트가 화면에 그려지거나, 특정 값이 바뀔 때 특정 작업을 수행하도록 하는 Hook입니다. `protected-route.tsx`에서 사용자가 로그인했는지 확인하고, 안 했다면 로그인 페이지로 보내는 작업을 할 때 사용되었습니다.

## 2. Next.js: React를 위한 슈퍼 프레임워크

Next.js는 React를 기반으로, 더 쉽고 강력하게 웹 애플리케이션을 만들 수 있도록 도와주는 **프레임워크**입니다. React가 UI 블록을 만드는 도구라면, Next.js는 그 블록들을 가지고 집(웹사이트)을 짓는 방법과 규칙을 제공합니다.

### 주요 특징

- **파일 기반 라우팅**: `app` 폴더 안에 파일을 만들면 그 파일의 경로가 그대로 웹사이트 주소가 됩니다. 예를 들어, `app/contests/page.tsx` 파일을 만들면 `내웹사이트.com/contests` 라는 페이지가 자동으로 생성됩니다. 매우 직관적이죠.
- **서버사이드 렌더링 (SSR)**: 웹 페이지를 서버에서 미리 만들어서 사용자에게 보여주는 방식입니다. 덕분에 초기 로딩 속도가 매우 빠르고, 검색 엔진 최적화(SEO)에 유리합니다.
- **코드 분할**: 각 페이지에 필요한 코드만 불러오기 때문에 전체 애플리케이션이 가볍고 빨라집니다.

## 3. 우리 프로젝트 구조 간단히 보기

- **`app/`**: 웹사이트의 모든 페이지가 이 폴더 안에 들어있습니다. 파일 경로가 곧 URL이 됩니다.
  - **`layout.tsx`**: 모든 페이지에 공통으로 적용되는 뼈대 파일입니다. `Header`나 `Footer`처럼 모든 페이지에 나와야 하는 컴포넌트는 보통 여기에 넣습니다.
  - **`page.tsx`**: 각 페이지의 실제 콘텐츠를 담고 있는 파일입니다.
- **`components/`**: 재사용 가능한 UI 컴포넌트(블록)들이 모여있는 폴더입니다.
  - **`ui/`**: 버튼, 카드, 입력창 등 작고 범용적인 기본 UI 컴포넌트들이 들어있습니다.
- **`docs/`**: 지금 보고 계신 이 문서처럼, 프로젝트의 이해를 돕는 문서들이 저장되는 폴더입니다.