<template>
    <div>

        <el-row style="margin-top: 20px;margin-left: 50px" class="tac">
                <el-col :span="3">
                        <el-menu
                                default-active="1"
                                class="el-menu-vertical-demo">
                                <p style="float: left;margin-top: 20px;margin-left: 20px">PUBLIC</p>
                                <el-menu-item style="clear: both" index="1">
                                        <template #title>
                                                <el-icon><ChatLineSquare /></el-icon>
                                                <span>Questions</span>
                                        </template>
                                </el-menu-item>

                                <el-menu-item index="2">
                                        <el-icon><HelpFilled /></el-icon>
                                        <span>Tags</span>
                                </el-menu-item>
                                <el-menu-item index="3">
                                        <el-icon><User /></el-icon>
                                        <span>Users</span>
                                </el-menu-item>
                                <el-menu-item index="4">
                                        <el-icon><Promotion /></el-icon>
                                        <span>Companies</span>
                                </el-menu-item>
                                <div style="width: 100%;height: 350px">
                                </div>
                            </el-menu>
                    </el-col>
                    <el-col style="background-color: white;margin-left: 20px" :span="15">

                            <span style="text-align: left;margin-left: 30px;float: left;font-size: 30px;margin-top: 20px">Top Questions</span>

                            <el-button size="large" style="float: right;margin-top: 20px;margin-right: 40px"  type="primary">Ask Questions</el-button>

                            <el-button-group style="margin-top: 10px;float: right;color: #2c3e50;clear: both;margin-right: 40px" class="ml-4">
                                    <el-button disabled>Interesting</el-button>
                                    <el-button>    <el-tag
                                            class="mx-1"
                                            effect="dark"
                                    >211</el-tag>&nbsp;&nbsp;&nbsp;Bountied</el-button>
                                    <el-button>Hot</el-button>
                                    <el-button>Week</el-button>
                                    <el-button>Month</el-button>
                            </el-button-group>
                            <el-divider style="margin-top: 20px;float: right" />

                                <div style="width: 100%;height: 80%;float: left">
                                        <el-row >
                                                <el-col style="font-size: 15px;color: #9c9c9c;text-align: right" :span="4" >
                                                        <a style="float: right;margin-top: 5px">0 &nbsp;&nbsp; votes</a><br>
                                                        <a style="clear:both;float: right;margin-top: 10px">1&nbsp;&nbsp;  answer</a><br>
                                                        <a style="clear:both;float: right;margin-top: 10px">7  &nbsp; &nbsp;views</a>
                                                </el-col>
                                                <el-col style="margin-left: 20px;" :span="18">
                                                        <a style="float: left;font-size: 20px;color: #409eff">Django Field comprising of other fields</a><br>
                                                        <el-tag style="clear:both;float: left;margin-top: 10px;background-color: #e4eaf5;color:#87a0b6">python</el-tag>
                                                        <el-tag style="float: left;margin-top: 10px;margin-left: 10px;background-color: #e4eaf5;color: #87a0b6">django</el-tag>
                                                        <el-tag style="float: left;margin-top: 10px;margin-left: 10px;background-color: #e4eaf5;color: #87a0b6">logic</el-tag>
                                                        <span style="float: right;margin-top: 10px">answered 23 secs ago</span>
                                                        <span style="float: right;margin-top: 10px;font-weight: bold">386&nbsp;&nbsp;</span>
                                                        <span style="float: right;margin-top: 10px;color: #409eff">Tornike Skhulukhia &nbsp;&nbsp;</span>

                                                </el-col>
                                                <el-divider style="margin-top: 20px;float: right" />
                                        </el-row>

                                        <el-row >
                                                <el-col style="font-size: 15px;color: #9c9c9c;text-align: right" :span="4" >
                                                        <a style="float: right;margin-top: 5px">0 &nbsp;&nbsp; votes</a><br>
                                                        <a style="clear:both;float: right;margin-top: 10px">1&nbsp;&nbsp;  answer</a><br>
                                                        <a style="clear:both;float: right;margin-top: 10px">7  &nbsp; &nbsp;views</a>
                                                </el-col>
                                                <el-col style="margin-left: 20px;" :span="18">
                                                        <a style="float: left;font-size: 20px;color: #409eff">Django Field comprising of other fields</a><br>
                                                        <el-tag style="clear:both;float: left;margin-top: 10px;background-color: #e4eaf5;color:#87a0b6">python</el-tag>
                                                        <el-tag style="float: left;margin-top: 10px;margin-left: 10px;background-color: #e4eaf5;color: #87a0b6">django</el-tag>
                                                        <el-tag style="float: left;margin-top: 10px;margin-left: 10px;background-color: #e4eaf5;color: #87a0b6">logic</el-tag>
                                                        <span style="float: right;margin-top: 10px">answered 23 secs ago</span>
                                                        <span style="float: right;margin-top: 10px;font-weight: bold">386&nbsp;&nbsp;</span>
                                                        <span style="float: right;margin-top: 10px;color: #409eff">Tornike Skhulukhia &nbsp;&nbsp;</span>

                                                </el-col>
                                                <el-divider style="margin-top: 20px;float: right" />
                                        </el-row>

                                        <el-row >
                                                <el-col style="font-size: 15px;color: #9c9c9c;text-align: right" :span="4" >
                                                        <a style="float: right;margin-top: 5px">0 &nbsp;&nbsp; votes</a><br>
                                                        <a style="clear:both;float: right;margin-top: 10px">1&nbsp;&nbsp;  answer</a><br>
                                                        <a style="clear:both;float: right;margin-top: 10px">7  &nbsp; &nbsp;views</a>
                                                </el-col>
                                                <el-col style="margin-left: 20px;" :span="18">
                                                        <a style="float: left;font-size: 20px;color: #409eff">Django Field comprising of other fields</a><br>
                                                        <el-tag style="clear:both;float: left;margin-top: 10px;background-color: #e4eaf5;color:#87a0b6">python</el-tag>
                                                        <el-tag style="float: left;margin-top: 10px;margin-left: 10px;background-color: #e4eaf5;color: #87a0b6">django</el-tag>
                                                        <el-tag style="float: left;margin-top: 10px;margin-left: 10px;background-color: #e4eaf5;color: #87a0b6">logic</el-tag>
                                                        <span style="float: right;margin-top: 10px">answered 23 secs ago</span>
                                                        <span style="float: right;margin-top: 10px;font-weight: bold">386&nbsp;&nbsp;</span>
                                                        <span style="float: right;margin-top: 10px;color: #409eff">Tornike Skhulukhia &nbsp;&nbsp;</span>

                                                </el-col>
                                                <el-divider style="margin-top: 20px;float: right" />
                                        </el-row>
                                        <el-row >
                                                <el-col style="font-size: 15px;color: #9c9c9c;text-align: right" :span="4" >
                                                        <a style="float: right;margin-top: 5px">0 &nbsp;&nbsp; votes</a><br>
                                                        <a style="clear:both;float: right;margin-top: 10px">1&nbsp;&nbsp;  answer</a><br>
                                                        <a style="clear:both;float: right;margin-top: 10px">7  &nbsp; &nbsp;views</a>
                                                </el-col>
                                                <el-col style="margin-left: 20px;" :span="18">
                                                        <a style="float: left;font-size: 20px;color: #409eff">Django Field comprising of other fields</a><br>
                                                        <el-tag style="clear:both;float: left;margin-top: 10px;background-color: #e4eaf5;color:#87a0b6">python</el-tag>
                                                        <el-tag style="float: left;margin-top: 10px;margin-left: 10px;background-color: #e4eaf5;color: #87a0b6">django</el-tag>
                                                        <el-tag style="float: left;margin-top: 10px;margin-left: 10px;background-color: #e4eaf5;color: #87a0b6">logic</el-tag>
                                                        <span style="float: right;margin-top: 10px">answered 23 secs ago</span>
                                                        <span style="float: right;margin-top: 10px;font-weight: bold">386&nbsp;&nbsp;</span>
                                                        <span style="float: right;margin-top: 10px;color: #409eff">Tornike Skhulukhia &nbsp;&nbsp;</span>

                                                </el-col>
                                                <el-divider style="margin-top: 20px;float: right" />
                                        </el-row>
                                </div>

                    </el-col>


            </el-row>
        </div>
</template>

  <script lang="ts" setup>
  import {
          ChatLineSquare,
          HelpFilled,
          User,
          Promotion
  } from '@element-plus/icons-vue'



  </script>



<style>

</style>
