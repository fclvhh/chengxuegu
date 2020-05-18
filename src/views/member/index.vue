<template>
  <div>
    <!-- :inline="true" 表单一行显示 -->
    <el-form
      ref="searchForm"
      :inline="true"
      :model="searchMap"
      style="margin-top: 20px"
    >
      <!-- 重置会看 el-form-item 组件元素的 prop 上是否指定了字段名，指定了才会重置生效 -->
      <el-form-item prop="cardNum">
        <el-input
          v-model="searchMap.cardNum"
          placeholder="会员卡号"
          style="width: 200px"
        ></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input
          v-model="searchMap.name"
          placeholder="会员名字"
          style="width: 200px"
        ></el-input>
      </el-form-item>
      <el-form-item prop="payType">
        <el-select
          v-model="searchMap.payType"
          placeholder="支付类型"
          style="width: 110px"
        >
          <!-- 不要忘记 payTypeOptions 绑定到data中 -->
          <el-option
            v-for="option in payTypeOptions"
            :key="option.type"
            :label="option.name"
            :value="option.type"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="birthday">
        <!-- value-format 是指定绑定值的格式 -->
        <el-date-picker
          style="width: 200px"
          value-format="yyyy-MM-dd"
          v-model="searchMap.birthday"
          type="date"
          placeholder="出生日期"
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="fetchData">查询</el-button>
        <el-button type="primary" @click="handleAdd">新增</el-button>
        <el-button @click="resetForm('searchForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="list" height="380" border style="width: 100%">
      <!--type="index" 获取索引值，从1开始； label 显示的标题; prop 数据字段名； width 列的宽度 -->
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="cardNum" label="会员卡号"></el-table-column>
      <el-table-column prop="name" label="会员姓名"></el-table-column>
      <el-table-column prop="birthday" label="会员生日"></el-table-column>
      <el-table-column
        prop="phone"
        label="手机号码"
        width="110"
      ></el-table-column>
      <el-table-column prop="integral" label="可用积分"></el-table-column>
      <el-table-column prop="money" label="开卡金额"></el-table-column>
      <el-table-column prop="payType" label="支付类型">
        <template slot-scope="scope">
          <span>{{
            scope.row.payType | payTypeFilter(scope.row.payType)
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="会员地址"
        width="180"
      ></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row.id)"
            >编辑</el-button
          >
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页的el-ui 模板 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>

    <!-- 弹出新增窗口 
        title 窗口的标题
        :visible.sync 当它true的时候，窗口会被弹出
        -->
    <el-dialog title="会员编辑" :visible.sync="dialogFormVisible" width="500px">
      <el-form
        :rules="rules"
        ref="pojoForm"
        label-width="100px"
        label-position="right"
        style="width: 400px;"
        :model="pojo"
      >
        <el-form-item label="会员卡号" prop="cardNum">
          <el-input v-model="pojo.cardNum"></el-input>
        </el-form-item>
        <el-form-item label="会员姓名" prop="name">
          <el-input v-model="pojo.name"></el-input>
        </el-form-item>
        <el-form-item label="会员生日" prop="birthday">
          <!-- value-format 是指定绑定值的格式 -->
          <el-date-picker
            style="width: 200px"
            value-format="yyyy-MM-dd"
            v-model="pojo.birthday"
            type="date"
            placeholder="会员生日"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="pojo.phone"></el-input>
        </el-form-item>
        <el-form-item label="开卡金额" prop="money">
          <el-input v-model="pojo.money"></el-input>
        </el-form-item>
        <el-form-item label="可用积分" prop="integral">
          <el-input v-model="pojo.integral"></el-input>
        </el-form-item>
        <el-form-item label="支付类型" prop="payType">
          <el-select
            v-model="pojo.payType"
            placeholder="支付类型"
            style="width: 110px"
          >
            <!-- 不要忘记 payTypeOptions 绑定到data中 -->
            <el-option
              v-for="option in payTypeOptions"
              :key="option.type"
              :label="option.name"
              :value="option.type"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="会员地址" prop="address">
          <el-input type="textarea" v-model="pojo.address"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <!-- <el-button type="primary" @click="addData('pojoForm')">确 定</el-button> -->
        <el-button
          type="primary"
          @click="
            pojo.id === null ? addData('pojoForm') : updateData('pojoForm')
          "
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import memberApi from "@/api/member";

// 支付类型Type 转换
const payTypeOptions = [
  { type: "1", name: "现金" },
  { type: "2", name: "微信" },
  { type: "3", name: "支付宝" },
  { type: "4", name: "银行卡" },
];
export default {
  data() {
    return {
      list: [],
      total: 0, // 总记录数
      currentPage: 1, // 当前页, 默认第1页
      pageSize: 10, // 每页显示条数， 10条
      searchMap: {}, // 条件查询绑定条件值
      payTypeOptions, // payTypeOptions: payTypeOptions
      dialogFormVisible: false, //控制对话框
      pojo: {
        id: null,
        cardNum: "",
        name: "",
        birthday: "",
        phone: "",
        money: 0,
        integral: 0,
        payType: "",
        address: "",
      }, // 提交的数据
      rules: {
        // 校验规则
        cardNum: [{ required: true, message: "卡号不能为空", trigger: "blur" }],
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
        payType: [
          { required: true, message: "支付类型不能为空", trigger: "change" },
        ],
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      //  未分页前的数据
      // memberApi.getList().then((res) => {
      //   this.list = res.data.data;
      //   console.log(this.list);
      // });
      memberApi
        .search(this.currentPage, this.pageSize, this.searchMap)
        .then((response) => {
          console.log(response.data);
          const reqs = response.data;
          this.total = reqs.data.total;
          this.list = reqs.data.rows;
          console.log(this.total, this.list);
        });
    },
    handleEdit(id) {
      // 清空原数据
      this.handleAdd(); // 通过Id查询数据
      memberApi.getById(id).then((response) => {
        const resp = response.data;
        if (resp.flag) {
          this.pojo = resp.data;
        }
      });
    },
    // 删除会员
    handleDelete(id) {
      console.log("删除", id);
      this.$confirm("确认删除这条记录吗？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
      })
        .then(() => {
          // 确认
          console.log("确认");
          memberApi.deleteById(id).then((response) => {
            // console.log(response)
            const resp = response.data;

            this.$message({
              message: resp.message,
              type: resp.flag ? "success" : "error",
            });

            if (resp.flag) {
              // 删除成功，刷新列表数据
              this.fetchData();
            }
          });
        })
        .catch(() => {
          // 取消，不用理会
          console.log("取消");
        });
    },
    handleSizeChange(val) {
      // console.log(val)
      this.pageSize = val;
      this.fetchData();
    },
    // 当页码改变后,被触发 , val 是最新的页面
    handleCurrentChange(val) {
      // console.log(val)
      this.currentPage = val;
      this.fetchData();
    },
    //重置
    resetForm(formName) {
      console.log("重置", formName);
      // 重置会看 el-form-item 组件元素的 prop 上是否指定了字段名，指定了才会重置生效
      this.$refs[formName].resetFields();
    },
    // 提交新增数据
    addData(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //提交表单
          console.log("addData");
          memberApi.add(this.pojo).then((response) => {
            const resp = response.data;
            if (resp.flag) {
              //新增成功，刷新列表数据
              this.fetchData();
              this.dialogFormVisible = false; // 关闭窗口
            } else {
              // 失败，来点提示信息
              this.$message({
                message: resp.message,
                type: "warning",
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    // 弹出新增窗口
    handleAdd() {
      console.log(this.pojo);
      // this.pojo = {}
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        // this.$nextTick()它是一个异步事件，当渲染结束 之后 ，它的回调函数才会被执行
        // 弹出窗口打开之后 ，需要加载Dom, 就需要花费一点时间，我们就应该等待它加载完dom之后，再进行调用resetFields方法，重置表单和清除样式
        this.$refs["pojoForm"].resetFields();
      });
    },
    updateData(formName) {
      console.log("updateData");
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 提交更新
          memberApi.update(this.pojo).then((response) => {
            const resp = response.data;
            if (resp.flag) {
              // 刷新列表
              this.fetchData();
              this.dialogFormVisible = false;
            } else {
              this.$message({
                message: resp.message,
                type: "warning",
              });
            }
          });
        } else {
          return false;
        }
      });
    },
  },
  filters: {
    payTypeFilter(type) {
      // 全局的 payTypeOptions , 返回一个满足条件的对象
      const payObj = payTypeOptions.find((obj) => obj.type === type); // 非空返回类型名称
      return payObj ? payObj.name : null;
    },
  },
};
</script>
<style></style>
