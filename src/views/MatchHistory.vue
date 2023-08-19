<template>
  <el-table :data="filterTableData" style="width: 80%; height: 80%; margin: 5% auto; overflow: none;">
    <el-table-column label="Date" prop="date" />
    <el-table-column label="Match id" prop="id" />
    <el-table-column
      prop="tag"
      label="Tag"
      width="100"
      :filters="[
        { text: 'Win', value: 'Win' },
        { text: 'Lose', value: 'Lose' },
      ]"
      :filter-method="filterTag"
      filter-placement="bottom-end"
    >
      <template #default="scope">
        <el-tag
          :type="scope.row.tag === 'Win' ? '' : 'success'"
          disable-transitions
          >{{ scope.row.tag }}</el-tag
        >
      </template>
    </el-table-column>
    <el-table-column align="right">
      <template #header>
        <el-input v-model="search" size="small" placeholder="Type to search" />
      </template>
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
          >Details</el-button
        >
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >Report</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

interface User {
  date: string
  id: string
  tag: string
}

const search = ref('')
const filterTableData = computed(() =>
  tableData.filter(
    (data) =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase())
  )
)
const handleEdit = (index: number, row: User) => {
  console.log(index, row)
}
const handleDelete = (index: number, row: User) => {
  console.log(index, row)
}

const tableData: User[] = [
  {
    date: '2023-05-03 10:00',
    id: '1011001118',
    tag: 'Win',
  },
  {
    date: '2023-05-02 11:00',
    id: '1011001117',
    tag: 'Lose',
  },
  {
    date: '2023-05-01 11:00',
    id: '1011001116',
    tag: 'Win',
  },
  {
    date: '2023-05-01 10:00',
    id: '1011001115',
    tag: 'Lose',
  },

]
const filterTag = (value: string, row: User) => {
  return row.tag === value
}
</script>
