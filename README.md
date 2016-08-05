#DICEWARE

A Diceware password generator

#TODO:
- Add JS to pull words from words JSON upon input in textareas
- Add options for the password (capitalization, separation, RNG method)
- Add calculation for 'time to crack' measurement
- Add links for further reading
- Implement XKCD-style wordlist

##DESIGN
Generate a 6 word passphrase
[] [] [] [] [] (word)
[] [] [] [] [] (word)
[] [] [] [] [] (word)
[] [] [] [] [] (word)
[] [] [] [] [] (word)
[] [] [] [] [] (word)
^Copyable text

[TIME TO CRACK: A million days!]

[OPTIONS]
    - Randomize capitalization (default: all lowercase)
    - Specify separation (default: &space, (underscore, hyphen, mix))
    - Random number generation (default: None (Javascript.random(), Mersenne))
