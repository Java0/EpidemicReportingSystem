<template>
  <div id="epidemic_audit">
    <h5>
      核酸场所：
    </h5>

    <select v-model="selected">
      <option selected="selected" :value="null">[未选择]</option>
      <option v-for="p in place" :key="p.code" name="place" :value="p">{{ p.code }}-{{ p.name }}</option>
    </select>

    <hr>

    <table v-if="selected" border="2px" cellspacing="0px">
      <tr>
        <th>场所信息</th>
      </tr>
      <tr>
        <td v-for="(value, key) in selected">
          <span>{{ key }}:</span>
        </td>
      </tr>
      <tr>
        <td v-for="(value, key) in selected">
          <input :disabled="notWriting" :placeholder="value" @change="inputChange($event, key)">
        </td>
      </tr>
    </table>

    <p id="edit">
      <button v-if="selected" @click="writeClick()">{{ msg }}</button>
    </p>

  </div>
</template>

<script>
export default {
  data() {
    return {
      place: [
        { code: 1, name: '库尔勒天百购物中心', location: '库尔勒', 'admin-id': "001", 'admin-name': '张三' },
        { code: 2, name: '且末县人民公园', location: '且末县', 'admin-id': "002", 'admin-name': '李四' }
      ],

      selected: null,
      notWriting: true,
      msg: "编辑信息",
    }
  },

  methods: {
    writeClick() {
      this.notWriting = !this.notWriting
      if (this.notWriting) {
        this.msg = "编辑信息"
      } else {
        this.msg = "保存编辑"
      }
    },

    inputChange(event, key) {
      const target = event.currentTarget;

      const value = target.value;

      Object.defineProperty(this.selected, key, {
        value: value,
        writable: true,
        enumerable: true,
        configurable: true
      })
    }
  },
}
</script>

<style>
</style>