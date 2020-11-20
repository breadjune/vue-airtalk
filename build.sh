# ex) export VUE_HOME=/Users/atingle/vscode_workspace/vue-airtalk
export VUE_HOME={home경로}/{vue project 경로}
# ex) export SPRING_HOME=/Users/atingle/vscode_workspace/airtalk
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

# Server run
cd $SPRING_HOME
./gradlew bootrun