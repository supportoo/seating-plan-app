console.log("Javascript is loading correctly!");

{\rtf1\ansi\ansicpg1252\cocoartf2512
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 HelveticaNeue;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww10800\viewh8400\viewkind0
\deftab560
\pard\pardeftab560\slleading20\partightenfactor0

\f0\fs24 \cf0 let seatingPlan = [];\
let classList = [];\
\
function generateSeatingPlan() \{\
    const input = document.getElementById('class-list').value;\
    classList = input.split(',').map(name => name.trim());\
\
    const seatingLayout = document.getElementById('seating-layout');\
    seatingLayout.innerHTML = '';\
\
    classList.forEach((student, index) => \{\
        const seat = document.createElement('div');\
        seat.classList.add('seat');\
        seat.draggable = true;\
        seat.textContent = student;\
\
        seat.addEventListener('dragstart', (e) => \{\
            e.dataTransfer.setData('text/plain', index);\
        \});\
\
        seat.addEventListener('dragover', (e) => \{\
            e.preventDefault();\
        \});\
\
        seat.addEventListener('drop', (e) => \{\
            e.preventDefault();\
            const draggedIndex = e.dataTransfer.getData('text/plain');\
            swapSeats(draggedIndex, index);\
        \});\
\
        seatingPlan.push(seat);\
        seatingLayout.appendChild(seat);\
    \});\
\}\
\
function swapSeats(fromIndex, toIndex) \{\
    const temp = seatingPlan[fromIndex].textContent;\
    seatingPlan[fromIndex].textContent = seatingPlan[toIndex].textContent;\
    seatingPlan[toIndex].textContent = temp;\
\}\
\
function autoAssignSeats() \{\
    classList.sort(() => Math.random() - 0.5);\
    seatingPlan.forEach((seat, index) => \{\
        seat.textContent = classList[index] || '';\
    \});\
\}\
\
function exportLayout() \{\
    alert("Export as PDF functionality will be implemented in the next update.");\
\}\
\
generateSeatingPlan();}
