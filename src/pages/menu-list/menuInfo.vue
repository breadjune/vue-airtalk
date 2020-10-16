<template>
    <div>
        <h4>메뉴 상세 정보</h4>
        <form>
            <table class="table table-striped">
                <tbody>
                    <b-tr>
                        <td > ID </td>
                        <td> {{ seq }} </td>
                    </b-tr>
                    <b-tr>
                        <td> 메뉴명 </td>
                        <td> {{ title }} </td>
                    </b-tr>
                    <tr>
                        <td> TYPE </td>
                        <td> {{ type }} </td>
                    </tr>
                    <tr>
                        <td> URL </td>
                        <td> {{ url }} </td>
                    </tr>

                    <tr>
                        <td> MENU_ICON </td>
                        <td> {{ icon }} </td>
                    </tr>

                    <tr>
                        <td> DESCRIPTION </td>
                        <td> {{ description }} </td>
                    </tr>

                    <tr>
                        <td> 등록 일자 </td>
                        <td> {{ regdate }} </td>
                    </tr>

                    <b-tr>
                        <b-td> 수정 일자 </b-td>
                        <b-td> {{ moddate }} </b-td>
                    </b-tr>
                </tbody>
            </table>
            <button class="btn btn-info btn-fill btn-primary">수정</button>
        </form>

        <h4>Menu_func</h4>
        <b-table striped hover :items="items"></b-table>
  </div>
</template>
<script>
export default {
    props:['seq','title','type','url','icon','description','regdate','moddate'],
    data() {
      return {
        items: [
          { NAME: 40, URL: 'Dickerson', AUTH: 'Macdonald' },
          { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
          { age: 38, first_name: 'Jami', last_name: 'Carney' }
        ]
      }
    },
    created(){
        console.log('menuInfo vue console ... ');
        console.log(this.$props.seq);
    }
}
</script>