# Next.js 설정

이 프로젝트는 next.config.ts에서 Server Action 요청 크기 제한과 외부 이미지 도메인 허용을 설정합니다.

## 1. Server Action 요청 크기 설정

```ts
experimental: {
  serverActions: {
    bodySizeLimit: '10mb',
  },
},
```

Server Action으로 전달되는 요청 본문의 최대 크기를 10mb로 설
큰 폼 데이터나 비교적 많은 요청 데이터를 처리할 때 기본 제한으로 인한 오류를 줄이기 위한 설정

## 2. 외부 이미지 허용 설정

```ts
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'sprint-fe-project.s3.ap-northeast-2.amazonaws.com',
      port: '',
      pathname: '/globalnomad/**',
    },
  ],
},
```

- next/image 컴포넌트에서 외부 이미지를 사용할 수 있도록 허용
- 이 프로젝트에서는 S3 버킷의 /globalnomad/** 경로에 있는 이미지만 허용
- 허용되지 않은 외부 이미지 주소는 next/image에서 사용할 수 없음

---

# ESLint Convention (Next.js + Sheriff)

이 프로젝트는 **코드 품질, 안정성, 일관된 구조 유지**를 위해  
[`eslint-config-sheriff`](https://www.npmjs.com/package/eslint-config-sheriff)를 기반으로 ESLint를 구성합니다.

Sheriff는 강한 규칙을 가진 opinionated 설정이며,  
여기에 **Next.js 환경 + 최소한의 커스텀 규칙**을 추가한 형태입니다.

## 1. 기본 철학

이 프로젝트의 ESLint 규칙은 아래 원칙을 따릅니다:

- ❗ **버그 가능성은 적극적으로 차단**
- ⚖️ **개발 생산성을 해치지 않는 선에서 규칙 완화**
- 📦 **Next.js 권장 방식 최대한 유지**
- 🧩 **불필요한 스타일 강제 최소화**

## 2. 기본 구성

### Sheriff 기반 설정

- React, Next.js, Storybook 환경 활성화
- TypeScript 기반 strict linting
- import 정렬, 코드 구조, 안전성 관련 규칙 포함

```ts
sheriff({
  react: true,
  next: true,
  storybook: true,
});
```

## 3. 주요 Sheriff 규칙 (핵심 요약)

Sheriff는 다음과 같은 규칙들을 기본으로 강제합니다:

### 3.1 코드 안정성

- any 사용 제한 (가능한 타입 명시)
- 잘못된 Promise 사용 방지
- unsafe 연산 (any, unknown 등) 경고
- 타입 정보를 바탕으로 불필요하거나 위험한 조건문 패턴 감지

👉 런타임 에러 방지 목적

### 3.2 React / Next.js

- React Hook 규칙 강제
- React 컴포넌트와 Hook 사용 시 권장 패턴 유도
- Next.js best practice 적용

👉 성능 + 유지보수성 확보

### 3.3 import / 구조

- import 순서 자동 정렬
- 순환 의존성 방지
- 불필요한 import 제거

👉 코드 가독성 유지

### 3.4 코드 구조와 가독성

- 일관된 함수 작성 방식
- 불필요한 조건문/삼항 연산 제한
- 명확한 코드 구조 유도

👉 가독성과 유지보수성 향상

## 4. 커스텀 규칙 (Custom Rules)

Sheriff 기본 규칙 외에, 프로젝트 특성에 맞게 **일부 규칙을 완화**했습니다:

### 4.1 완화된 규칙

#### 4.1.1 Hook 의존성 검사 완화

```ts
react-hooks/exhaustive-deps: "warn"
```

- deps 누락 시 에러 → 경고로 변경
- 개발 중 빠른 반복 작업을 위해 완화

#### 4.1.2 사용하지 않는 변수

```ts
@typescript-eslint/no-unused-vars: "warn"
```

- 에러 대신 경고
- 테스트 코드 / 임시 변수 허용

#### 4.1.3 Next.js <img> 사용

```ts
@next/next/no-img-element: "warn"
```

- `<Image />` 대신 `<img>` 사용 시 경고만 표시
- 상황에 따라 유연하게 사용 가능

## 5. TypeScript 설정

```ts
languageOptions: {
  parserOptions: {
    projectService: true,
    tsconfigRootDir: import.meta.dirname,
  },
}
```

- TypeScript 타입 정보를 활용한 lint 활성화
- 단순 문법이 아닌 "실제 타입 기반 오류"까지 검사
- 프로젝트 루트를 기준으로 올바르게 tsconfig를 해석할 수 있도록 설정

👉 예시:
잘못된 Promise 처리
잘못된 타입 사용
불필요한 조건문

## 6. 무시 대상

다음 파일/폴더는 lint 대상에서 제외

```ts
ignores: [
  'node_modules/**',
  '.next/**',
  'out/**',
  'build/**',
  'next-env.d.ts',
];
```

👉 이유:
빌드 산출물 / 자동 생성 파일 제외
불필요한 lint 비용 방지

## 7. 규칙을 수정하고 싶을 때

규칙은 `eslint.config.mjs`에서 직접 수정 가능

```
rules: {
  "some-rule": "off"
}
```

👉 권장 방식:
❌ 한 번에 많이 끄지 않기
✅ 불편한 규칙만 최소한으로 조정

## 참고

- Sheriff: opinionated ESLint config
- Next.js ESLint: core-web-vitals 기준 권장
- TypeScript ESLint: 타입 기반 lint 활용

---

# Prettier Convention (Next.js + Tailwind CSS)

이 프로젝트는 ESLint와 함께 Prettier를 사용하여 코드 포맷을 자동으로 통일합니다.

## 1. 목적
- 코드 스타일 논쟁 제거
- 리뷰 시 로직에만 집중
- 자동 포맷으로 생산성 향상

## 2. 주요 설정
- 들여쓰기: 2 spaces
- 세미콜론: 사용
- 문자열: 작은따옴표 (')
- 한 줄 길이: 80자
- trailing comma: 허용 (ES5 기준)
- Tailwind 클래스 자동 정렬 (plugin 사용)
- JSX 속성도 작은따옴표 사용
- 줄바꿈 문자 LF 통일

## 3. ESLint와의 역할 분리

| 도구 | 역할 |
| --- | --- |
| ESLint | 버그 방지, 코드 품질 |
| Prettier | 코드 스타일 정리 |

👉 충돌 방지를 위해 스타일 관련 규칙은 Prettier에 위임

## 4. 추천 개발 워크플로우

### 4.1 저장 시 자동 포맷

에디터에서 다음 설정을 권장

- format on save 활성화
- ESLint + Prettier 확장 설치

#### VS code 예시

프로젝트별로 적용하려면 `.vscode/settings.json` 파일을 만들고 아래 설정을 추가

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```