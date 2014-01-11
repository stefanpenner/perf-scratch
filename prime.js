function Primes() {
  this.prime_count = 0;
  this.primes = new Array(25000);
};

Primes.prototype.getPrimeCount = function() {
  return this.prime_count;
}

Primes.prototype.getPrime = function(i) {
  return this.primes[i];
}

Primes.prototype.addPrime = function(i) {
    this.primes[this.prime_count++] = i;
}

Primes.prototype.isPrimeDivisible = function(candidate) {
    for (var i = 1; i <= this.prime_count; ++i) {
      if ((candidate % this.primes[i]) == 0) return true;
    }
    return false;
  }

function main() {
  p = new Primes();
  var c = 1;
  while ((p.getPrimeCount()|0) < 25000) {
    if (!p.isPrimeDivisible(c)) {
      p.addPrime(c);
    }
    c++;
  }
  return p.getPrime(p.getPrimeCount()-1);
}

console.log(main());
