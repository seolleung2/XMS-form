# XMS Project

## 🌺 프로젝트 설명

WMS, TMS, OMS 등 다양한 Management System 들이 있습니다. 회사에서 WMS 프로젝트의 프론트엔드 부분을 맡아 개발을 하면서 몇 가지 느낀 사항이 있는데요.
그것은 XMS 로 대표하는 프로그램들의 공통점은 입력값, 복잡한 Form 들을 처리한다는 것입니다.

여러 입력값 들이 존재하는 Form 을 구현해 보고 화면에서 조회, 등록, 삭제 를 구현해 보았습니다.

## 👑 간단 소개

화물 기사의 배송 주문 정보를 등록하고 테이블에서 주문 항목을 조회 및 삭제를 한 화면에서 할 수 있는 XMS 입니다.

입력할 수 있는 기본 항목 (이름 ~ 출근지) 에 추가로 상차지 정보를 등록하며, 상차지 정보는 최대 3개까지 추가할 수 있습니다.

상차지 정보는 최소 한 개가 들어가야 하며, 기본 항목의 물량을 제외한 나머지 항목들은 필수 항목입니다.

품목 항목에서 '직접입력' 을 선택 시 오른쪽 입력값은 필수 항목입니다.
물량 항목에서 항목을 선택 시 오른쪽 입력값은 필수 항목입니다.

그리고 테이블의 page, 페이지의 size 선택에 맞는 조회 (GET) 데이터를 요청합니다.

사용된 기술 스택 및 라이브러리는 다음과 같습니다.

- nextjs : v13.2.4
- react : v18.2.0
- typescript : v5.0.2
- react-hook-form : v7.43.8
- @tanstack/react-query : v4.28.0
- msw : v1.1.0
- emotion/react, emotion/styled : v11.10.6
- tailwindcss : v3.2.7
- antd : v5.3.2
- node js: v16.18.0
- package manager: yarn v1.22.19

### STEP 1. git clone 을 받습니다.

- git clone [https://github.com/seolleung2/XMS-form.git](https://github.com/seolleung2/XMS-form.git)

### STEP 2. 현재 위치해 있는 branch 를 확인합니다.

기본 **default branch 를 develop** 으로 설정해 놓았고 작업 시 feature/task1 과 같은 브랜치를 따서 PR 을 통해 develop 브랜치에 merge 하는 방식으로 진행하였습니다.

해당 develop 에서 main 브랜치로 향하는 **Pull Request**를 생성 하였고 Github 에서 확인하실 수 있습니다.

그러므로 위치되어 있는 branch 가 develop branch 인지 확인해 주시고, 그렇지 않다면 develop 브랜치로 이동해 주세요.

### STEP 3. package 설치 및 실행.

- yarn install 을 통해 패키지 dependency 등을 인스톨 합니다.
- 이후 yarn start 커맨드로 프론트엔드 개발 서버를 작동합니다.

## 🎇 과제 프로젝트 UI

### 1. 전체 화면

![https://user-images.githubusercontent.com/69143207/227844996-38122fc2-134e-4faa-b0eb-e71cb7e87d37.png](https://user-images.githubusercontent.com/69143207/227844996-38122fc2-134e-4faa-b0eb-e71cb7e87d37.png)

### 2. 태블릿 화면

![https://user-images.githubusercontent.com/69143207/227846080-1b2f2219-99e5-4bbe-9851-00dc9096ebc5.png](https://user-images.githubusercontent.com/69143207/227846080-1b2f2219-99e5-4bbe-9851-00dc9096ebc5.png)

### 3. 모바일 화면

![https://user-images.githubusercontent.com/69143207/227846255-91e4770e-0128-48c1-988f-d689732eaca3.png](https://user-images.githubusercontent.com/69143207/227846255-91e4770e-0128-48c1-988f-d689732eaca3.png)

## 🚗 세부 구현 사항

### 1. 품목, 물량의 Selectbox 를 선택 및 세부사항 관련

입력 폼에서 품목, 물량을 선택하고 세부사항을 Input 에 입력 한 뒤 다시 선택을 해제 하면 해당 입력값이 없어지도록 구현하였습니다.

### 2. 날짜 선택은 Ant-Design 의 DatePicker 를 커스텀하여 사용

날짜 선택은 Ant Design 의 DatePicker 컴포넌트를 커스텀하여 사용하였습니다. 이외의 input, select, button 은 자체 컴포넌트로 개발하였습니다.

### 3. React.Portal 로 Modal 컴포넌트 작성 및 적용

모달 컴포넌트는 직접 자체 컴포넌트로 개발하였습니다.

![https://user-images.githubusercontent.com/69143207/227846515-d16dd1d0-6dc9-4747-bcb4-f75a264f62e0.png](https://user-images.githubusercontent.com/69143207/227846515-d16dd1d0-6dc9-4747-bcb4-f75a264f62e0.png)

![https://user-images.githubusercontent.com/69143207/227846613-68041715-2c21-4feb-a2c9-71c16aabce86.png](https://user-images.githubusercontent.com/69143207/227846613-68041715-2c21-4feb-a2c9-71c16aabce86.png)

### 4. 데이터 캐싱, 페칭을 위해 React-Query 적용 및 별도의 Hook 으로 코드 작성

한번 요청한 API 의 데이터 (pagination 의 페이지 선택 등) 는 캐싱하여 API 를 재 호출 하지 않습니다. 그리고 별도의 훅으로 코드를 작성해 복잡한 코드를 최소화 하였습니다.

```tsx
export const useAddOrderMutation = (
  successCallback: (result: {
    success: boolean;
    message: string;
    data: OrderFields;
  }) => void
) => {
  const client = useQueryClient();
  return useMutation((body: ReqBody) => api.addOrder(body), {
    onSuccess: (result) => {
      client
        .invalidateQueries(['orderlist'])
        .then(() => successCallback(result));
    },
  });
};
```

### 5. 상차지 정보 항목 생성은 react-hook-form 의 useFieldArray 사용

입력 폼을 효과적으로 처리하기 위해 react-hook-form 을 사용하였고 useFieldArray 를 통해 상차지 정보 추가 및 삭제 기능을 구현하였습니다.

### 6. 폼 제출 (추가), 삭제 요청을 위한 버튼에 더블 클릭 방지 적용

추가, 삭제 버튼을 클릭 시 조건의 상태 (boolean) 가 바뀜에 따라 버튼이 disabled 처리 되도록 하였습니다.

### 7. Table 컴포넌트 - Ant Design 의 Table 컴포넌트 사용

테이블 높이를 지정하여 스크롤이 생기며 헤더가 고정되어 보이게 됩니다.
(혹시 추가 요청 후 데이터가 잘 안보일 때 스크롤을 한번 위로 올려 주시길 부탁드립니다)

## 👨🏻‍💻 마치면서

WMS 개발에 참여해 보면서 다양한 경험을 해 볼 수 있었습니다. 다만 이러한 작업 내역을 포트폴리오의 gif 화면 등으로만 보여지는 데서 실제 Form 을 코드로 어떻게 다루는지 알 수 없어 아쉬운 점이 있었습니다.

그래서 이번 기회에 Form 을 어떻게 다루는지, 백엔드에서의 데이터가 없을 때 msw 를 어떻게 사용하는지, 리액트 쿼리는 어떻게 적용해 보았는지에 대해 미니 프로젝트로 만들어 보았습니다.

부족한 점이나 이해가 잘 되지 않는 부분에 대해서는 이슈 생성 혹은 seolleung22@gmail.com 으로 메일 주시면 감사하겠습니다.
