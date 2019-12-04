<template>
  <CDataTable
    :items="items"
    :fields="fields"
    column-filter
    table-filter
    items-per-page-select
    hover
    sorter
    pagination
  >
    <template #status="{item}">
      <td>
        <CBadge :color="getBadge(item.status)">
          {{item.status}}
        </CBadge>
      </td>
    </template>
    <template #show_details="{item, index}">
      <td class="py-2">
        <CButton
          color="primary"
          variant="outline"
          square
          size="sm"
          @click="toggleDetails(index)"
        >
          {{details.includes(index) ? 'Hide' : 'Show'}}
        </CButton>
      </td>
    </template>
    <template #details="{item, index}">
      <CCollapse :show="details.includes(index)">
        <CCardBody>
          {{index + 1}} - {{item}}
        </CCardBody>
      </CCollapse>
    </template>
  </CDataTable>
</template>
<script>
const fields = [
  { key: 'username', _style:'width:40%' },
  'registered',
  { key: 'role', _style:'width:20%;' },
  { key: 'status', _style:'width:20%;' },
  { 
    key: 'show_details', 
    label: '', 
    _style: 'width:1%', 
    sorter: false, 
    filter: false
  }
]

const items = [
  { username: 'Samppa Nori', registered: '2012/01/01', role: 'Member', status: 'Active'},
  { username: 'Estavan Lykos', registered: '2012/02/01', role: 'Staff', status: 'Banned'},
  { username: 'Chetan Mohamed', registered: '2012/02/01', role: 'Admin', status: 'Inactive'},
  { username: 'Derick Maximinus', registered: '2012/03/01', role: 'Member', status: 'Pending'},
  { username: 'Friderik Dávid', registered: '2012/01/21', role: 'Staff', status: 'Active'},
  { username: 'Yiorgos Avraamu', registered: '2012/01/01', role: 'Member', status: 'Active'},
  { username: 'Avram Tarasios', registered: '2012/02/01', role: 'Staff', status: 'Banned', _classes: 'table-success'},
  { username: 'Quintin Ed', registered: '2012/02/01', role: 'Admin', status: 'Inactive'},
  { username: 'Enéas Kwadwo', registered: '2012/03/01', role: 'Member', status: 'Pending'},
  { username: 'Agapetus Tadeáš', registered: '2012/01/21', role: 'Staff', status: 'Active'},
  { username: 'Carwyn Fachtna', registered: '2012/01/01', role: 'Member', status: 'Active', _classes: 'table-info'},
  { username: 'Nehemiah Tatius', registered: '2012/02/01', role: 'Staff', status: 'Banned'},
  { username: 'Ebbe Gemariah', registered: '2012/02/01', role: 'Admin', status: 'Inactive'},
  { username: 'Eustorgios Amulius', registered: '2012/03/01', role: 'Member', status: 'Pending'},
  { username: 'Leopold Gáspár', registered: '2012/01/21', role: 'Staff', status: 'Active'},
  { username: 'Pompeius René', registered: '2012/01/01', role: 'Member', status: 'Active'},
  { username: 'Paĉjo Jadon', registered: '2012/02/01', role: 'Staff', status: 'Banned'},
  { username: 'Micheal Mercurius', registered: '2012/02/01', role: 'Admin', status: 'Inactive'},
  { username: 'Ganesha Dubhghall', registered: '2012/03/01', role: 'Member', status: 'Pending'},
  { username: 'Hiroto Šimun', registered: '2012/01/21', role: 'Staff', status: 'Active'},
  { username: 'Vishnu Serghei', registered: '2012/01/01', role: 'Member', status: 'Active'},
  { username: 'Zbyněk Phoibos', registered: '2012/02/01', role: 'Staff', status: 'Banned'},
  { username: 'Einar Randall', registered: '2012/02/01', role: 'Admin', status: 'Inactive', _classes: 'table-danger'},
  { username: 'Félix Troels', registered: '2012/03/21', role: 'Staff', status: 'Active'},
  { username: 'Aulus Agmundr', registered: '2012/01/01', role: 'Member', status: 'Pending'}
]

export default {
  name: 'tables',
  data () {
    return {
      items,
      fields,
      details: []
    }
  },
  methods: {
    getBadge (status) {
      return status === 'Active' ? 'success'
             : status === 'Inactive' ? 'secondary'
             : status === 'Pending' ? 'warning'
             : status === 'Banned' ? 'danger' : 'primary'
    },
    toggleDetails (index) {
      const position = this.details.indexOf(index)
      position !== -1 ? this.details.splice(position, 1) : this.details.push(index)
    }
  }
}
</script>