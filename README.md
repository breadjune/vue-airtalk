# [AirTalk Admin](http://172.23.16.23:8080) [![version][version-badge]][CHANGELOG] [![license][license-badge]][LICENSE]

> airTalk 관리자 페이지 빌드 및 실행 방법 설명 

이 프로젝트는 vue + spring 으로 개발된 프로젝트입니다.Light Bootstrap Dashboard 기반으로 제작 되었으며, vue-router, vuex, vue-cookie 등 여러 플러그인/구성 요소가 포합됩니다. [Light bootstrap dashboard](https://www.creative-tim.com/product/light-bootstrap-dashboard)

## :new: 시작

1. 프로젝트 다운로드
2. node.js 설치 확인 (https://nodejs.org/en/) installed
3. `npm install` 입력 (`package.json` 디펜던시 항목 다운로드)
4. `npm run dev` 명령으로 실행 확인 
5. build.sh 수정
```bash
#ex) VUE_HOME=/Users/home/vscode/vue-airtalk
export VUE_HOME={home경로}/{vue project 경로}
#ex) SPRING_HOME=/Users/home/vscode/airtalk
export SPRING_HOME={home경로}/{spring project 경로}

cd $VUE_HOME/src/components
sed -e 's/http:\/\/localhost:8080//g' axioMixin.js > axioMixin.js.temp
mv axioMixin.js.temp    axioMixin.js

# vue compile
cd $VUE_HOME
npm run build

# vue compiled file copy for deploy
cd $VUE_HOME/dist
cp -R $VUE_HOME/dist/* $SPRING_HOME/src/main/resources/static
``` 
6. airtalk 프로젝트(spring)으로 이동 후 `static` 경로 확인
 - `cd ../airtalk/src/main/resources/static`
7. gradle 실행
 - `./gradlew bootrun`

## :hash: 설정
###### vue
의존성 설치.
`npm install`.
라이브 dev 실행 (화면만 확인 가능 API 호출 X).
`npm run dev`.
빌드.
`npm run build`.
단위 테스트.
`npm run unit`.
.
###### spring
빌드.
`./gradlew build`.
실행
`./gradlew bootrun`.

[CHANGELOG]: ./CHANGELOG.md
[LICENSE]: ./LICENSE.md
[version-badge]: https://img.shields.io/badge/version-1.0.0-blue.svg
[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg
