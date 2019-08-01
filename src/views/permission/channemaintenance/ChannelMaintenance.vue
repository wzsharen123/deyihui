<template>
  <div class="allzong">
    <div class="chresh">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="销售渠道类别">
          <el-input v-model="formInline.user" placeholder="" />
        </el-form-item>
        <el-form-item label="销售渠道名称">
          <el-input v-model="formInline.user" placeholder="" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>

        <span class="rightCaozuo">
          <el-button
            type="primary"
            icon="el-icon-circle-plus-outline"
          >新建</el-button>
          <el-button type="success" icon="el-icon-download">导出</el-button>
          <el-button type="danger" icon="el-icon-delete">批量删除</el-button>
        </span>
      </el-form>
    </div>

    <div class="pagebefor">
      <template>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          :header-cell-style="{
            'background-color': '#fafafa',
            color: 'rgb(0, 0, 0)'
          }"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column label="销售渠道类型" width="120">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column prop="name" label="渠道名称" width="120" />
          <el-table-column
            prop="address"
            label="省/市/区"
            show-overflow-tooltip
          />
          <el-table-column prop="address" label="详细地址" show-overflow-tooltip />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleUpdate()">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="open"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
          <div class="block">
            <el-pagination background layout="prev, pager, next" :total="1000" />
          </div>
        </div>
      </template>
      <el-dialog :visible.sync="dialogFormVisible">
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="渠道类型" prop="name">
            <el-input
              v-model="ruleForm.name"
              type="textarea"
              placeholder="请输入内容"
              :maxlength="textInputMaxLength"
              show-word-limit
            />
          </el-form-item>
          <el-form-item label="渠道名称">
            <el-input v-model="jiancheng" />
          </el-form-item>

          <el-form-item label="渠道简介">
            <el-input
              v-model="jianjie"
              type="textarea"
              maxlength="30"
              show-word-limit
            />
          </el-form-item>

          <el-form-item label="省市区">
            <diqu />
          </el-form-item>

          <el-form-item label="详细地址">
            <el-input v-model="ruleForm.desc" type="textarea" maxlength="30" show-word-limit />
          </el-form-item>
          <el-form-item style="text-align: right">
            <el-button
              type="primary"
              @click="submitForm('ruleForm')"
            >保存</el-button>
            <el-button @click="resetForm('ruleForm')">取消</el-button>
          </el-form-item>
          <p class="shuoming">
            创建者：张三 创建时间：2019-01-01 最后修改人：张三
            最后修改时间：2019-02-01 20:30
          </p>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import diqu from '../directive/diqu.vue'

export default {
  components: {
    diqu
  },
  data() {
    return {
      state1: '',
      options: [{ // 所属医院
        value: '选项1',
        label: '北京协和'
      }, {
        value: '选项2',
        label: '上海通用'
      }, {
        value: '选项3',
        label: '京溪南方医院'
      }, {
        value: '选项4',
        label: '解放军第五人民医院'
      }, {
        value: '选项5',
        label: '人民医院'
      }],
      value: '',
      formInline: {
        user: '',
        region: ''
      },
      currentPage4: 1, // 分页
      tableData: [
        {
          date: '德医汇',
          name: '德',
          address: '广东省广州市天河区人民医院对面'
        },
        {
          date: '德医汇',
          name: '德',
          address: '广东省广州市天河区人民医院对面'
        },
        {
          date: '德医汇',
          name: '德',
          address: '广东省广州市天河区人民医院对面'
        },
        {
          date: '德医汇',
          name: '德',
          address: '广东省广州市天河区人民医院对面'
        },
        {
          date: '德医汇',
          name: '德',
          address: '广东省广州市天河区人民医院对面'
        },
        {
          date: '德医汇',
          name: '德',
          address: '广东省广州市天河区人民医院对面'
        },
        {
          date: '德医汇',
          name: '德',
          address: '广东省广州市天河区人民医院对面'
        },
        {
          date: '德医汇',
          name: '德',
          address: '广东省广州市天河区人民医院对面'
        }
      ],
      multipleSelection: [],
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogStatus: '',
      dialogFormVisible: false,
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          {
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }
        ],
        date2: [
          {
            type: 'date',
            required: true,
            message: '请选择时间',
            trigger: 'change'
          }
        ],
        type: [
          {
            type: 'array',
            required: true,
            message: '请至少选择一个活动性质',
            trigger: 'change'
          }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [{ required: true, message: '请填写活动形式', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.restaurants = this.loadAll()
  },

  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    handleUpdate() {
      this.dialogFormVisible = !this.dialogFormVisible
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    onSubmit() {
      console.log('submit!')
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    open() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 模糊查询下拉框

    querySearch(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        )
      }
    },
    loadAll() {
      return [
        { value: '三全鲜食（北新泾店）', address: '长宁区新渔路144号' },
        {
          value: 'Hot honey 首尔炸鸡（仙霞路）',
          address: '上海市长宁区淞虹路661号'
        },
        {
          value: '新旺角茶餐厅',
          address: '上海市普陀区真北路988号创邑金沙谷6号楼113'
        },
        { value: '泷千家(天山西路店)', address: '天山西路438号' },
        {
          value: '胖仙女纸杯蛋糕（上海凌空店）',
          address: '上海市长宁区金钟路968号1幢18号楼一层商铺18-101'
        },
        { value: '贡茶', address: '上海市长宁区金钟路633号' },
        {
          value: '豪大大香鸡排超级奶爸',
          address: '上海市嘉定区曹安公路曹安路1685号'
        },
        {
          value: '茶芝兰（奶茶，手抓饼）',
          address: '上海市普陀区同普路1435号'
        },
        { value: '十二泷町', address: '上海市北翟路1444弄81号B幢-107' },
        { value: '星移浓缩咖啡', address: '上海市嘉定区新郁路817号' },
        { value: '阿姨奶茶/豪大大', address: '嘉定区曹安路1611号' },
        { value: '新麦甜四季甜品炸鸡', address: '嘉定区曹安公路2383弄55号' },
        {
          value: 'Monica摩托主题咖啡店',
          address: '嘉定区江桥镇曹安公路2409号1F，2383弄62号1F'
        },
        {
          value: '浮生若茶（凌空soho店）',
          address: '上海长宁区金钟路968号9号楼地下一层'
        },
        { value: 'NONO JUICE  鲜榨果汁', address: '上海市长宁区天山西路119号' },
        { value: 'CoCo都可(北新泾店）', address: '上海市长宁区仙霞西路' },
        {
          value: '快乐柠檬（神州智慧店）',
          address: '上海市长宁区天山西路567号1层R117号店铺'
        },
        {
          value: 'Merci Paul cafe',
          address: '上海市普陀区光复西路丹巴路28弄6号楼819'
        },
        {
          value: '猫山王（西郊百联店）',
          address: '上海市长宁区仙霞西路88号第一层G05-F01-1-306'
        },
        { value: '枪会山', address: '上海市普陀区棕榈路' },
        { value: '纵食', address: '元丰天山花园(东门) 双流路267号' },
        { value: '钱记', address: '上海市长宁区天山西路' },
        { value: '壹杯加', address: '上海市长宁区通协路' },
        {
          value: '唦哇嘀咖',
          address: '上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元'
        },
        { value: '爱茜茜里(西郊百联)', address: '长宁区仙霞西路88号1305室' },
        {
          value: '爱茜茜里(近铁广场)',
          address:
            '上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺'
        },
        {
          value: '鲜果榨汁（金沙江路和美广店）',
          address: '普陀区金沙江路2239号金沙和美广场B1-10-6'
        },
        {
          value: '开心丽果（缤谷店）',
          address: '上海市长宁区威宁路天山路341号'
        },
        { value: '超级鸡车（丰庄路店）', address: '上海市嘉定区丰庄路240号' },
        { value: '妙生活果园（北新泾店）', address: '长宁区新渔路144号' },
        { value: '香宜度麻辣香锅', address: '长宁区淞虹路148号' },
        {
          value: '凡仔汉堡（老真北路店）',
          address: '上海市普陀区老真北路160号'
        },
        { value: '港式小铺', address: '上海市长宁区金钟路968号15楼15-105室' },
        { value: '蜀香源麻辣香锅（剑河路店）', address: '剑河路443-1' },
        { value: '北京饺子馆', address: '长宁区北新泾街道天山西路490-1号' },
        {
          value: '饭典*新简餐（凌空SOHO店）',
          address: '上海市长宁区金钟路968号9号楼地下一层9-83室'
        },
        {
          value: '焦耳·川式快餐（金钟路店）',
          address: '上海市金钟路633号地下一层甲部'
        },
        { value: '动力鸡车', address: '长宁区仙霞西路299弄3号101B' },
        { value: '浏阳蒸菜', address: '天山西路430号' },
        { value: '四海游龙（天山西路店）', address: '上海市长宁区天山西路' },
        {
          value: '樱花食堂（凌空店）',
          address: '上海市长宁区金钟路968号15楼15-105室'
        },
        { value: '壹分米客家传统调制米粉(天山店)', address: '天山西路428号' },
        {
          value: '福荣祥烧腊（平溪路店）',
          address: '上海市长宁区协和路福泉路255弄57-73号'
        },
        {
          value: '速记黄焖鸡米饭',
          address: '上海市长宁区北新泾街道金钟路180号1层01号摊位'
        },
        { value: '红辣椒麻辣烫', address: '上海市长宁区天山西路492号' },
        {
          value: '(小杨生煎)西郊百联餐厅',
          address: '长宁区仙霞西路88号百联2楼'
        },
        { value: '阳阳麻辣烫', address: '天山西路389号' },
        {
          value: '南拳妈妈龙虾盖浇饭',
          address: '普陀区金沙江路1699号鑫乐惠美食广场A13'
        }
      ]
    },
    handleSelect(item) {
      console.log(item)
    }
  }
}
</script>

<style lang="scss" scoped>
.allzong {
  background: #fff;
  width: 97%;
  margin: 20px auto;
  padding: 15px 0 20px 0;
  border-radius: 10px;
}
.rightCaozuo {
  float: right;
  margin-right: 10%;
}
.pagebefor {
  margin: 10px auto 0 auto;
  padding-bottom: 10px;
  border: 1px #f3f3f3 solid;
  width: 98%;
}
.block {
  margin: 0 auto;
  width: 70%;
}
.shuoming {
  padding-left: 100px;
  padding-top: 30px;
  color: #ccc;
  font-size: 12px;
}
.chresh {
  width: 98%;
  margin: 15px auto 0 auto;
}
.el-autocomplete {
  width: 100%;
}
</style>
