const fs = require('fs');

let content = fs.readFileSync('C:\\Users\\sakib\\.cline\\data\\workspaces\\chat\\Kitchen-Appliances-Hub\\src\\pages\\checkout.astro', 'utf8');

// 1. Add totalSteps = 3 after currentStep
content = content.replace(
  "let currentStep = 1;\nlet unsubscribe: (() => void) | null = null;",
  "let currentStep = 1;\nconst totalSteps = 3;\nlet unsubscribe: (() => void) | null = null;"
);

// 2. Update showStep function: step 4 -> step 3
content = content.replace("nextBtn.classList.toggle('hidden', step === 4);", "nextBtn.classList.toggle('hidden', step === totalSteps);");
content = content.replace("placeOrderBtn.classList.toggle('hidden', step !== 4);", "placeOrderBtn.classList.toggle('hidden', step !== totalSteps);");
content = content.replace("if (step === 4) { renderReviewContact(); renderReviewPayment(); }", "if (step === totalSteps) { renderReview(); }");

// 3. Update validateStep(4) -> validateStep(3)
content = content.replace("if (!validateStep(4)) return;", "if (!validateStep(totalSteps)) return;");

fs.writeFileSync('C:\\Users\\sakib\\.cline\\data\\workspaces\\chat\\Kitchen-Appliances-Hub\\src\\pages\\checkout.astro', content);
console.log('Done part 1');