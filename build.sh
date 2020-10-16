export VUE_HOME=/Users/kas0610/Project/VisualSudioCodePojects/vue-airtalk
export SPRING_HOME=/Users/kas0610/Project/VisualSudioCodePojects/airtalk

cd $VUE_HOME/src/components
sed -e 's/http:\/\/localhost:8080//g' axioMixin.js > axioMixin.js.temp
mv axioMixin.js.temp    axioMixin.js

# vue compile
cd $VUE_HOME
npm run build

# vue compiled file copy for deploy
cd $VUE_HOME/dist
cp -R $VUE_HOME/dist/* $SPRING_HOME/src/main/webapp

