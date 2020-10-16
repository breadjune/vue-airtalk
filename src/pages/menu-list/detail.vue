<template>
    <div>
    <div class="x_content">
    <h4>메뉴 상세 정보</h4>
    <table class="table table-striped responsive-utilities jambo_table dataTable" aria-describedby="example_info">
        <tbody>
            <tr>
                <td style="width:20%"> ID </td>
                <td> {{ seq }} </td>
            </tr>
            <tr>
                <td> 메뉴명 </td>
                <td> {{ title }} </td>
            </tr>
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

            <tr>
                <td> 수정 일자 </td>
                <td> {{ moddate }} </td>
            </tr>

        </tbody>
    </table>
    </div>
  </div>
</template>
<script>
export default {
    props:['seq','title','type','url','icon','description','regdate','moddate'],
    created(){
        console.log('detail vue console ... ');
        console.log(this.$props.seq);
    }
}
</script>