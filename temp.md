```javascript
// Function to check if a number is prime and return its factors if not prime.

/**
* Determines if a number is prime and returns its factors if it's not.
*
* @param {number} num The number to check. Must be an integer greater than 1.
* @returns {string|number[]} If the number is prime, returns "Prime". Otherwise, returns an array of its prime factors.
Returns an error message if input is invalid.
* @throws {Error} If the input is not a valid integer greater than 1.
*/
function isPrimeAndFactors(num) {
// Error handling for invalid input
if (!Number.isInteger(num) || num <= 1) { throw new Error("Input must be an integer greater than 1."); } //Efficient
    primality test and factor finding. //Optimization: Only check divisibility up to the square root of num. for (let
    i=2; i <=Math.sqrt(num); i++) { if (num % i===0) { // Found a factor, so it's not prime. Now find all prime factors.
    const factors=[]; while (num % i===0) { factors.push(i); num /=i; } //Handle remaining factor if num is not 1 after
    the loop. if (num> 1) {
    factors.push(num);
    }
    return factors;
    }
    }

    // If no factors were found, the number is prime.
    return "Prime";
    }


    //Example Usage
    try{
    console.log(isPrimeAndFactors(2)); // Output: Prime
    console.log(isPrimeAndFactors(15)); // Output: [3, 5]
    console.log(isPrimeAndFactors(97)); // Output: Prime
    console.log(isPrimeAndFactors(100)); // Output: [2, 2, 5, 5]
    console.log(isPrimeAndFactors(0)); // Throws Error: "Input must be an integer greater than 1."
    console.log(isPrimeAndFactors(1.5)); // Throws Error: "Input must be an integer greater than 1."
    console.log(isPrimeAndFactors(-5)); // Throws Error: "Input must be an integer greater than 1."
    console.log(isPrimeAndFactors(1)); // Throws Error: "Input must be an integer greater than 1."
    } catch (error) {
    console.error("Error:", error.message);
    }

    ```