## Description

* TDD로 배달 시스템을 구현하였습니다. 
* 메인 시나리오 
  https://stream-talon-ff2.notion.site/1-faf92c276e0b4e8e97c0f14f5ad8f1aa
* 테스트 시나리오
 https://docs.google.com/spreadsheets/d/1mQ0bsoQCnQgZGLudDVAhmYH_gl9yv62YTUIFx7jQ4a4/edit#gid=507459023

## Features
* 유저 : 주문, 장바구니, 리뷰 등록
* 사장님 : 매장등록, 메뉴등록, 배달 상태관리
* 공통 : 로그인, 회원가입 

## Getting Started
```bash
# build
$ docker build . -t delivery_system

# run
$ docker container run -d -p 3000:3000 delivery_sytem

```
## Swagger
![화면 캡처 2023-06-30 012752](https://github.com/taekyunJason/delivery_system/assets/44867889/8969e244-f75e-4e92-b32d-b128a92932fb)

## Branch strategy
* main
* develop : 개발용 브랜치
* feature/xx-{feature-name} : 작업을 위한 브랜치 develop에서 가져옴
*  hotfix 브랜치 :  main에서 시급한 작업이 있을 경우 main에서 바로 머지 그 후 develop에 머지

1. pull request 날려서 feature 브랜치 develop으로 merge
2. develop 완료되면 main으로 merge

## PR/Issue Template
### **Pr Template**
#### 해결하려는 문제가 무엇인가요?    
* 작성되지 않은 컨트롤러 단을 완성 했습니다.  
* 스웨거가 일부 컨트롤러에만 적용되는 문제를 해결했습니다.  
* readme 문서를 업데이트했습니다.  
#### 어떻게 해결했나요?  
* app.module.ts 파일에서 필요한 모든 모듈을 불러왔습니다.  
* 스웨거 설정을 통해 api 설명을 추가했습니다.  
* 과제 서식에 맞춰 readme 문서를 업데이트 했습니다.  
#### 어떤 부분에 집중하여 리뷰해야 할까요?  
* 스웨거 적용에 문제가 없는지 확인 부탁드립니다.  
* readme에 빠진 부분 혹은 오타가 없는지 확인 부탁드립니다.

### **Issue Template**
#### Issue: Feature
#### Description
* 설명을 작성하세요
#### Todo
* [ ] 할것 목록
#### ETC
* 기타
