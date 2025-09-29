// export default function TimeInput({ value, label, onChange }: TimeInputProps) {

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const input = e.target.value.toUpperCase().replace(/[^0-9APM]/g, "");
//     let newValue = "";
//     let cursorPos = 0;

//     for (let i = 0; i < input.length && newValue.length < 8; i++) {
//       const char = input[i];
//       let hour;
//       switch (newValue.length) {
//         case 0: // first hour digit
//           if (/[0-1]/.test(char)) { newValue += char; cursorPos++; }
//           break;
//         case 1: // second hour digit
//           hour = parseInt(newValue[0] + char);
//           if (hour >= 1 && hour <= 12) { newValue += char; cursorPos++; }
//           break;
//         case 2: // auto colon
//           newValue += ":"; 
//           cursorPos++;
//           i--; // reprocess same char in next iteration
//           break;
//         case 3: // first minute digit
//           if (/[0-5]/.test(char)) { newValue += char; cursorPos++; }
//           break;
//         case 4: // second minute digit
//           if (/[0-9]/.test(char)) { newValue += char; cursorPos++; }
//           break;
//         case 5: // space before AM/PM
//           newValue += " ";
//           cursorPos++;
//           i--; // reprocess same char
//           break;
//         case 6: // A or P
//           if (char === "A" || char === "P") { newValue += char; cursorPos++; }
//           break;
//         case 7: // M
//           if (char === "M") { newValue += char; cursorPos++; }
//           break;
//       }
//     }

//     onChange(newValue);

//     // Restore cursor after value update
//     requestAnimationFrame(() => {
//       const pos = Math.min(cursorPos, newValue.length);
//       e.target.setSelectionRange(pos, pos);
//     });
//   };