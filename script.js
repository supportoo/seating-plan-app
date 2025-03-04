console.log("Javascript is loading correctly!");

let seatingPlan = [];
let classList = [];

function generateSeatingPlan() {
    const input = document.getElementById('class-list').value;
    classList = input.split(',').map(name => name.trim());

    const seatingLayout = document.getElementById('seating-layout');
    seatingLayout.innerHTML = '';

    classList.forEach((student, index) => {
        const seat = document.createElement('div');
        seat.classList.add('seat');
        seat.draggable = true;
        seat.textContent = student;

        seat.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', index);
        });

        seat.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        seat.addEventListener('drop', (e) => {
            e.preventDefault();
            const draggedIndex = e.dataTransfer.getData('text/plain');
            swapSeats(draggedIndex, index);
        });

        seatingPlan.push(seat);
        seatingLayout.appendChild(seat);
    });
}

function swapSeats(fromIndex, toIndex) {
    const temp = seatingPlan[fromIndex].textContent;
    seatingPlan[fromIndex].textContent = seatingPlan[toIndex].textContent;
    seatingPlan[toIndex].textContent = temp;
}

function autoAssignSeats() {
    classList.sort(() => Math.random() - 0.5);
    seatingPlan.forEach((seat, index) => {
        seat.textContent = classList[index] || '';
    });
}



document.getElementById('export-pdf').addEventListener('click', () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Capture seating plan as an image for better formatting
  html2canvas(document.querySelector('.seating-plan')).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    doc.addImage(imgData, 'PNG', 10, 10, 180, 100);
    doc.save('seating-plan.pdf');
  });
});
  
generateSeatingPlan();
