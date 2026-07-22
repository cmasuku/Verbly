const verbs = [
  {verb:"是", pinyin:"shì", meaning:"to be", example:"我是学生。 Wǒ shì xuésheng.", mastery:100},
  {verb:"有", pinyin:"yǒu", meaning:"to have", example:"我有一个问题。 Wǒ yǒu yí ge wèntí.", mastery:92},
  {verb:"去", pinyin:"qù", meaning:"to go", example:"我们去上班。 Wǒmen qù shàngbān.", mastery:86},
  {verb:"来", pinyin:"lái", meaning:"to come", example:"他明天来。 Tā míngtiān lái.", mastery:81},
  {verb:"做", pinyin:"zuò", meaning:"to do / make", example:"我做运动。 Wǒ zuò yùndòng.", mastery:45},
  {verb:"能", pinyin:"néng", meaning:"can / be able to", example:"我能帮你。 Wǒ néng bāng nǐ.", mastery:18},
  {verb:"想", pinyin:"xiǎng", meaning:"to want / think", example:"我想学中文。 Wǒ xiǎng xué Zhōngwén.", mastery:10},
  {verb:"说", pinyin:"shuō", meaning:"to speak / say", example:"她说中文。 Tā shuō Zhōngwén.", mastery:5}
];

const questionSets = {
  zuo: [
    {type:"mc", prompt:"Choose the correct verb", detail:"我每天早上___运动。 Wǒ měitiān zǎoshang ___ yùndòng.", options:["做 zuò","去 qù","说 shuō"], answer:"做 zuò"},
    {type:"type", prompt:"Translate using 做", detail:"We do the work. Type your answer in pinyin.", answers:["women zuo gongzuo","wǒmen zuò gōngzuò","women zuo zhege gongzuo","wǒmen zuò zhège gōngzuò"], displayAnswer:"wǒmen zuò gōngzuò"},
    {type:"mc", prompt:"Choose the best sentence", detail:"She makes dinner.", options:["她做晚饭。","她去晚饭。","她有晚饭。"], answer:"她做晚饭。"},
    {type:"mc", prompt:"What does 做 mean?", detail:"Select the closest meaning.", options:["to do / make","to go","to speak"], answer:"to do / make"},
    {type:"type", prompt:"Complete the sentence", detail:"你___什么？ Nǐ ___ shénme? — What are you doing? Type the missing verb in pinyin.", answers:["zuo","zuò"], displayAnswer:"zuò"}
  ],
  practice: [
    {type:"mc", prompt:"Choose the correct verb", detail:"我们___市场。 Wǒmen ___ shìchǎng. — We go to the market.", options:["去 qù","有 yǒu","说 shuō"], answer:"去 qù"},
    {type:"type", prompt:"Complete the sentence", detail:"我___一个问题。 Wǒ ___ yí ge wèntí. — I have a question. Type the missing verb in pinyin.", answers:["you","yǒu"], displayAnswer:"yǒu"},
    {type:"mc", prompt:"Choose the best translation", detail:"I am a student.", options:["我是学生。","我有学生。","我去学生。"], answer:"我是学生。"},
    {type:"type", prompt:"Translate", detail:"She wants to learn Chinese. Type your answer in pinyin.", answers:["ta xiang xue zhongwen","tā xiǎng xué zhōngwén","ta xiang xuexi zhongwen","tā xiǎng xuéxí zhōngwén"], displayAnswer:"tā xiǎng xué Zhōngwén"},
    {type:"mc", prompt:"Select the target verb", detail:"我能帮你。 Wǒ néng bāng nǐ.", options:["能 néng","说 shuō","做 zuò"], answer:"能 néng"}
  ]
};

let state = JSON.parse(localStorage.getItem("verblyChineseState") || '{"xp":0,"todayXp":0,"correct":0,"answered":0}');
let lesson = {questions:[], index:0, selected:null, complete:false};

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

function save(){ localStorage.setItem("verblyChineseState", JSON.stringify(state)); updateStats(); }

function updateStats(){
  $("#xp").textContent = state.xp;
  $("#progressXp").textContent = state.xp;
  $("#todayXp").textContent = state.todayXp;
  $("#dailyProgress").style.width = `${Math.min(100, state.todayXp/50*100)}%`;
  $("#accuracy").textContent = state.answered ? `${Math.round(state.correct/state.answered*100)}%` : "—";
}

function switchView(name){
  $$(".view").forEach(v => v.classList.remove("active"));
  $(`#${name}View`).classList.add("active");
  $$(".nav-item").forEach(n => n.classList.toggle("active", n.dataset.view === name));
  const titles = {learn:"Verb Path",practice:"Practice",verbs:"Verb Bank",progress:"Progress"};
  $("#pageTitle").textContent = titles[name];
}

$$(".nav-item").forEach(btn => btn.addEventListener("click", () => switchView(btn.dataset.view)));

function renderVerbTable(filter=""){
  const f = filter.toLowerCase();
  const rows = verbs.filter(v => `${v.verb} ${v.pinyin} ${v.meaning}`.toLowerCase().includes(f));
  $("#verbTable").innerHTML = `
    <div class="verb-row header"><span>Verb</span><span>Pinyin / meaning</span><span>Example</span><span>Mastery</span></div>
    ${rows.map(v => `<div class="verb-row"><strong class="hanzi">${v.verb}</strong><span>${v.pinyin}<br><small>${v.meaning}</small></span><span>${v.example}</span><span class="badge">${v.mastery}%</span></div>`).join("")}
  `;
}
$("#verbSearch").addEventListener("input", e => renderVerbTable(e.target.value));

function renderMastery(){
  $("#masteryList").innerHTML = verbs.slice(0,6).map(v => `
    <div class="mastery-item">
      <strong class="hanzi">${v.verb} <small>${v.pinyin}</small></strong>
      <div class="mastery-track"><span style="width:${v.mastery}%"></span></div>
      <span>${v.mastery}%</span>
    </div>
  `).join("");
}

function startLesson(kind="zuo"){
  lesson.questions = questionSets[kind] || questionSets.zuo;
  lesson.index = 0;
  lesson.selected = null;
  lesson.complete = false;
  $("#lessonModal").classList.remove("hidden");
  renderQuestion();
}

function normalize(s){
  return s
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[üǖǘǚǜ]/g, "v")
    .replace(/[’']/g, "")
    .replace(/[？?！!。.,，:：;；-]/g, "")
    .replace(/\s+/g, "");
}
function isCorrect(q, value){
  const accepted = q.answers || [q.answer];
  return accepted.some(answer => normalize(value) === normalize(answer));
}

function renderQuestion(){
  const q = lesson.questions[lesson.index];
  $("#feedback").className = "feedback hidden";
  $("#feedback").textContent = "";
  $("#checkAnswer").textContent = "Check";
  lesson.selected = null;
  $("#questionCount").textContent = `${lesson.index+1} / ${lesson.questions.length}`;
  $("#lessonProgressBar").style.width = `${lesson.index/lesson.questions.length*100}%`;
  let input = "";
  if(q.type === "mc"){
    input = `<div class="options">${q.options.map(o => `<button class="option" data-value="${o}">${o}</button>`).join("")}</div>`;
  } else {
    input = `<input class="answer-input" id="typedAnswer" placeholder="Type pinyin with regular letters" autocomplete="off" />`;
  }
  $("#questionArea").innerHTML = `<span class="eyebrow">Mandarin verb challenge</span><h3>${q.prompt}</h3><p>${q.detail}</p>${input}`;
  $$(".option").forEach(o => o.addEventListener("click", () => {
    $$(".option").forEach(x => x.classList.remove("selected"));
    o.classList.add("selected");
    lesson.selected = o.dataset.value;
  }));
}

$("#checkAnswer").addEventListener("click", () => {
  if(lesson.complete){ $("#lessonModal").classList.add("hidden"); return; }
  const q = lesson.questions[lesson.index];
  const feedback = $("#feedback");

  if($("#checkAnswer").textContent === "Continue"){
    lesson.index++;
    if(lesson.index >= lesson.questions.length){
      lesson.complete = true;
      $("#lessonProgressBar").style.width = "100%";
      $("#questionArea").innerHTML = `<span class="eyebrow">Lesson complete</span><h3>太好了！ Tài hǎo le!</h3><p>You practiced Mandarin verbs through word order, context, and sentence patterns.</p><div class="hero-card"><strong>Up to +50 XP</strong><p>Continue tomorrow to strengthen recall.</p></div>`;
      $("#feedback").className = "feedback correct";
      $("#feedback").textContent = "Lesson completed.";
      $("#checkAnswer").textContent = "Finish";
      return;
    }
    renderQuestion();
    return;
  }

  const value = q.type === "mc" ? lesson.selected : ($("#typedAnswer")?.value || "");
  if(!value) return;
  const correct = isCorrect(q, value);
  state.answered++;
  if(correct){ state.correct++; state.xp += 10; state.todayXp += 10; }
  save();

  feedback.className = `feedback ${correct ? "correct" : "wrong"}`;
  feedback.textContent = correct ? "Correct! +10 XP" : `Not quite. Correct answer: ${q.displayAnswer || q.answer}`;
  $("#checkAnswer").textContent = "Continue";
});

$("#closeLesson").addEventListener("click", () => $("#lessonModal").classList.add("hidden"));
$("#startLessonBtn").addEventListener("click", () => startLesson("zuo"));
$("#quickPracticeBtn").addEventListener("click", () => startLesson("practice"));
$$(".lesson[data-lesson]").forEach(l => l.addEventListener("click", () => startLesson(l.dataset.lesson === "zuo" ? "zuo" : "practice")));

renderVerbTable();
renderMastery();
updateStats();
