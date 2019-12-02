<template>

  <CCard>
    <CCardHeader>
      <slot name="header">
        <CIcon name="cil-grid"/> {{caption}}
      </slot>
    </CCardHeader>
    <CCardBody>
      <CDataTable
        :hover="hover"
        :striped="striped"
        :bordered="bordered"
        :small="small"
        :fixed="fixed"
        :items="getShuffledUsersData()"
        :fields="fields"
        :items-per-page="small ? 10 : 5"
        pagination
      >
      <template #action="{item}">
          <td>
            <CForm inline>
                <CButton color="outline-success" class="mr-sm-4" type="submit">Search</CButton>
                <CButton color="outline-warning" class="mr-sm-4" type="submit">Edit</CButton>
                <CButton color="outline-danger" class="my-2 my-sm-0" type="submit">Delete</CButton>
            </CForm>
          </td>
      </template>
      </CDataTable>
    </CCardBody>
  </CCard>
</template>

<script>
import studentsData from './data/student'
export default {
  name: 'Table',
  props: {
    fields: {
      type: Array,
      default () {
        return ['mssv', 'fullname', 'username', 'email', 'action']
      }
    },
    caption: {
      type: String,
      default: 'Student Table'
    },
    hover: Boolean,
    striped: Boolean,
    bordered: Boolean,
    small: Boolean,
    fixed: Boolean,
    dark: Boolean
  },
  methods: {
    shuffleArray (array) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))
        let temp = array[i]
        array[i] = array[j]
        array[j] = temp
      }
      return array
    },

    getShuffledUsersData () {
      return this.shuffleArray(studentsData.slice(0))
    },

    getBadge (status) {
      return status === 'Active' ? 'success'
        : status === 'Inactive' ? 'secondary'
          : status === 'Pending' ? 'warning'
            : status === 'Banned' ? 'danger' : 'primary'
    }
  }
}
</script>

