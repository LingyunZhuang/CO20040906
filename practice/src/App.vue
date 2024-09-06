<template>
<div>
  <div class="app" :style="size">

    <div class="rect" :class="drop?'drop':''">
      <Decorate/>
      <div class="screen">
        <div class="panel">
          <Matrix :propMatrix="matrix" :cur="cur" :reset="reset" />
          <Logo :cur="!!cur" :reset="reset" />
          <div class="state">
            <Point :cur="!!cur" :max="max" :point="points" :realScore="realScore"/>
<!--            terry 修改：去除起始行和级别-->
<!--            <p>{{pContent}}</p>-->
<!--            <Number :number='cur ? clearLines : startLines' />-->
<!--            <p>{{level}}</p>-->
<!--            <Number :number='cur?speedRun:speedStart' :length="1" />-->
            <p>{{nextText}}</p>
            <Next :data="next" />
            <div class="bottom">
              <Music :data="music" />
              <Pause :data="pause" />
<!--              terry修改，去除时间-->
<!--              <Number :propTime="true" />-->
            </div>
          </div>
        </div>
      </div>
    </div>
    <Keyboard :filling='filling' />
    <Guide/>
    <Devpanel v-if="ifDevMode"/>
    <Mission v-if="ifPractice"/>
    <!-- <MissionFormal v-if="ifShowLeaderboard"/>
    <MissionFormalNoFeedback v-if="!ifShowLeaderboard && !ifPractice"/> -->
  </div>
  <div class="ask" v-if="!ifPractice">
    <p>一共三关，<br/>每一关游戏结束后，<br/>请填写对应的问卷</p>
    <p>当前第{{curr+1}}关游戏</p>
    <template v-if="curr==1 && firstRoundFinished==true">
      <p><a :href="linklist[0]" target="_blank">去填写第1关问卷</a></p>
      <div style="display: flex; flex-direction: column; justify-content:center; align-items: center;">
        <span>第1关问卷凭证(问卷提交页面可见):</span>
        <input v-model="codeFirst" style="height: 40px; font-size: 14px;background:#fff;flex: 1" type="text" placeholder="请填写问卷凭证"/>
        <button @click="handleEnterFirst">开始下一关游戏</button>
      </div>
    </template>
    <template v-if="curr==2 && secondRoundFinished==true && thirdRoundFinished == false">
      <p><a :href="linklist[1]" target="_blank">去填写第2关问卷</a></p>
      <div style="display: flex; flex-direction: column; justify-content:center; align-items: center;">
        <span>第2关问卷凭证(问卷提交页面可见):</span>
        <input v-model="codeSecond" style="height: 40px; font-size: 14px;background:#fff;flex: 1" type="text" placeholder="请填写问卷凭证"/>
        <button @click="handleEnterSecond">开始下一关游戏</button>
      </div>
    </template>
    <template v-if="curr==2 && thirdRoundFinished==true">
      <p><a :href="linklist[2]" target="_blank">去填写第3关问卷</a></p>
      <div style="display: flex; flex-direction: column; justify-content:center; align-items: center;">
        <span>第3关问卷凭证(问卷提交页面可见):</span>
        <input v-model="codeThird" style="height: 40px; font-size: 14px;background:#fff;flex: 1" type="text" placeholder="请填写问卷凭证"/>
        <button @click="handleEnterThird">结束游戏</button>
      </div>
    </template>
  </div>
</div>
</template>

<style lang="less">
@import './app.less';
@import './loader.less';
</style>

<script src="./app.js">
</script>

