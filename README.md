# DICEWARE

Diceware is a method for generating long, secure passphrases that are difficult to guess, but easier to remember.

This webpage seeks to make the generation process easier while still allowing users to choose between dice and a computer for random number generation, as well as multiple wordlists.

For questions about the Diceware method, please visit the [official Diceware page](http://diceawre.com) and [Diceware FAQ](http://world.std.com/%7Ereinhold/dicewarefaq.html).

# PRNG Disclaimer

This implementation of Diceware passphrase generation has an auto-generate option that uses a [Cryptographically Secure PRNG](https://en.wikipedia.org/wiki/Cryptographically_secure_pseudorandom_number_generator) (CSPRNG) to simulate dice rolls. These types of pesudo-random number generators are better than most because, even if an attacker has access to a series of previous rolls, he cannot reliably predict the next roll. Despite this improvement, CSPRNGs are not truly random. I, and the Offical Diceware page, strongly recommend you use physical dice when generating passphrases.

# Dependencies

The webpage uses HTML, CSS, and built-in Javascript functions (no jQuery, etc.). In addition, it uses [random.js](https://github.com/ckknight/random-js) to generate random numbers. All dependencies are locally loaded, so no calls to any other servers are made (with the exception of a Google Analytics script so I can see how popular the webpage is).
