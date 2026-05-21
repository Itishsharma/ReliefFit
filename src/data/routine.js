// src/data/routine.js
// Age-wise personalized daily routine

export const ROUTINES = {
  young: { // Below 22 - student
    label: "Student (Below 22)",
    desc: "School/college schedule — morning and evening windows are yours",
    color: "#5285e0",
    schedule: [
      { time:"5:30 AM", icon:"🌅", title:"Wake & Hydrate", desc:"500ml warm water with lemon and honey. Students need cognitive sharpness — start by hydrating your brain first." },
      { time:"5:45 AM", icon:"🧘", title:"Surya Namaskar × 6", desc:"6 rounds of Surya Namaskar takes 15 minutes and covers your full exercise need. Perfect for school/college schedule." },
      { time:"6:15 AM", icon:"🍳", title:"Protein Breakfast", desc:"Moong dal chilla, eggs, or poha with peanuts. Protein breakfast improves exam concentration by 20%." },
      { time:"6:45 AM", icon:"📚", title:"Study Window (Before School)", desc:"45-minute focused study before school is worth 3 hours at night. Your brain is freshest in the morning." },
      { time:"7:30 AM – 4:00 PM", icon:"🏫", title:"School / College", desc:"You are in class — but do micro-movements: neck rolls between periods, walk to the water cooler, take stairs not lift." },
      { time:"4:30 PM", icon:"⚽", title:"Outdoor Sport / Walk", desc:"30–45 minutes of outdoor activity after school. Cricket, football, cycling, or simply walking. Non-negotiable for bone density.", important:true },
      { time:"5:30 PM", icon:"📖", title:"Study Block 1", desc:"90-minute focused study with Pomodoro — 25 min study, 5 min movement break. Do 10 calf raises every break." },
      { time:"7:00 PM", icon:"🍽️", title:"Light Dinner", desc:"Dal, roti, sabzi, curd. No junk food at night — your body is growing, feed it right." },
      { time:"8:00 PM", icon:"📖", title:"Study Block 2", desc:"Final 90-minute block. Write notes by hand — better retention than typing." },
      { time:"9:30 PM", icon:"📵", title:"No Screens", desc:"Phone down by 9:30 PM. Blue light kills melatonin production — poor sleep causes anxiety and brain fog." },
      { time:"10:00 PM", icon:"😴", title:"Sleep (8–9 hours)", desc:"Teenagers need 8–9 hours. Growth hormone releases only during deep sleep. Sleep is not lazy — it's productive." },
    ]
  },
  adult: { // 23-60 - working
    label: "Working Adult (23–60)",
    desc: "Office schedule — mornings, lunch breaks, and evenings are your windows",
    color: "#6db86d",
    schedule: [
      { time:"5:30 AM", icon:"🌅", title:"Wake & Water + Pranayama", desc:"500ml water, then 5 minutes Kapalbhati + Anulom Vilom. Clears brain fog and energises better than any coffee." },
      { time:"5:45 AM", icon:"🏋️", title:"Main Exercise Block", desc:"30–45 minutes: Surya Namaskar 8 rounds OR gym OR walk/run. The most powerful investment of your day.", important:true },
      { time:"6:30 AM", icon:"🧘", title:"Stretching & Mobility", desc:"10 minutes: hip flexor lunge, cat-cow, pigeon pose. Prevents the chronic pain of desk work before it starts." },
      { time:"7:00 AM", icon:"🍛", title:"High-Protein Breakfast", desc:"Moong dal chilla + sprouts + curd. Pack 25–30g protein at breakfast or you will overeat at lunch." },
      { time:"8:00 AM – 6:00 PM", icon:"💼", title:"Office Hours", desc:"CRITICAL: Every 45 min stand up, do 10 calf raises and a neck roll. Set a timer. This is your most important health habit.", important:true },
      { time:"1:00 PM", icon:"🥗", title:"Lunch Break Walk", desc:"10-minute walk after lunch. This single habit reduces risk of type 2 diabetes (highest in India) by 30%." },
      { time:"3:00 PM", icon:"💪", title:"Desk Stretch (5 min)", desc:"Chest opener, wrist extensions, hip flexor stretch at your desk. Do it without shame — pain is more embarrassing.", important:true },
      { time:"6:30 PM", icon:"🚶", title:"Evening Walk / Activity", desc:"30-minute walk or light gym. Evening exercise boosts testosterone and reduces cortisol from work stress." },
      { time:"7:30 PM", icon:"🍲", title:"Early Light Dinner", desc:"Khichdi, sabzi-roti, or a light dal. Eating before 8 PM is one of the most powerful metabolic changes you can make." },
      { time:"9:00 PM", icon:"🧘", title:"Wind-Down Yoga", desc:"10 minutes: Legs-up-wall, child's pose, savasana. Transitions nervous system from work mode to rest mode." },
      { time:"10:00 PM", icon:"😴", title:"Sleep (7–8 hours)", desc:"Non-negotiable. Sleep deprivation causes obesity, diabetes, anxiety, and heart disease. India has a sleep crisis." },
    ]
  },
  senior: { // 60+ 
    label: "Senior (60+)",
    desc: "Time and wisdom — gentle consistency over intensity",
    color: "#d4a92a",
    schedule: [
      { time:"6:00 AM", icon:"🌅", title:"Gentle Wake-Up", desc:"No alarm jolts. Wake naturally when light enters room. Seniors need a gentle morning — cortisol spikes are harmful." },
      { time:"6:15 AM", icon:"🍃", title:"Warm Water + Triphala", desc:"Warm water with Triphala churna. This Ayurvedic remedy supports digestion — the foundation of health at any age." },
      { time:"6:30 AM", icon:"🧘", title:"Chair Yoga / Gentle Yoga", desc:"20 minutes of gentle yoga from a chair or with support. Trikonasana, gentle twists, cat-cow. Movement prevents stiffness.", important:true },
      { time:"7:15 AM", icon:"🚶", title:"Morning Walk", desc:"20–30 minute walk in fresh morning air. Walking is the single best cardiovascular exercise for seniors — low risk, high reward.", important:true },
      { time:"8:00 AM", icon:"🍳", title:"Wholesome Breakfast", desc:"Daliya (broken wheat), upma with vegetables, or poha. Warm, easy-to-digest, protein-containing Indian breakfast." },
      { time:"9:00 AM", icon:"📰", title:"Mental Activity", desc:"Read, solve puzzles, play chess, practise music. Cognitive engagement is exercise for the brain — prevents dementia." },
      { time:"11:00 AM", icon:"☀️", title:"Sunlight (15 min)", desc:"Sit in morning sunlight for 15 minutes. Vitamin D deficiency is epidemic in India — sunlight is the cure, not supplements." },
      { time:"1:00 PM", icon:"🍛", title:"Main Meal of the Day", desc:"Dal, one roti, sabzi, curd, a little rice. Make lunch your largest meal — digestion is strongest at noon in Ayurveda." },
      { time:"2:00 PM", icon:"😴", title:"Afternoon Rest (Vishram)", desc:"20-minute rest (not deep sleep). Traditional Ayurvedic practice that restores energy without disrupting night sleep." },
      { time:"4:00 PM", icon:"🤸", title:"Gentle Stretching", desc:"Hip circles, shoulder rolls, ankle rotations. 15 minutes to prevent the joint stiffness that comes with age.", important:true },
      { time:"5:00 PM", icon:"👨‍👩‍👧", title:"Social Time", desc:"Family, friends, neighbours. Social connection reduces inflammation markers and depression — proven by research." },
      { time:"7:00 PM", icon:"🍲", title:"Light Dinner", desc:"Khichdi or light sabzi-roti. Nothing heavy after 7 PM — digestion slows dramatically in the evening for seniors." },
      { time:"9:00 PM", icon:"😴", title:"Sleep (7–8 hours)", desc:"Seniors often sleep less but need the same amount. Create a consistent routine: same time every night, cool dark room." },
    ]
  }
};
