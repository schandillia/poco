/* eslint-disable no-restricted-syntax */

const prepositions = [
  "aboard",
  "about",
  "above",
  "across",
  "after",
  "against",
  "along",
  "amid",
  "among",
  "around",
  "as",
  "at",
  "before",
  "behind",
  "below",
  "beneath",
  "beside",
  "between",
  "beyond",
  "by",
  "concerning",
  "considering",
  "despite",
  "down",
  "during",
  "except",
  "for",
  "from",
  "in",
  "inside",
  "into",
  "like",
  "near",
  "of",
  "off",
  "on",
  "onto",
  "out",
  "over",
  "past",
  "regarding",
  "round",
  "since",
  "through",
  "throughout",
  "to",
  "toward",
  "under",
  "underneath",
  "unlike",
  "until",
  "up",
  "upon",
  "with",
  "within",
  "without",
]
const articles = ["a", "an", "the"]
const conjunctions = ["and", "but", "for", "nor", "or", "so", "yet"]
const capitalizeHyphens = ["ama", "chicago", "mla", "wikipedia"]

function sentenceToArray(sentence: string): string[] {
  const regex = /(\s+|\n|[^\w\s'’]+)/g
  return sentence.split(regex).filter(Boolean)
}

function capitalizeWord(word: string): string {
  let capitalizedWord = ""
  let foundLetter = false
  for (let i = 0; i < word.length; i += 1) {
    if (!foundLetter && /[a-zA-Z]/.test(word[i])) {
      capitalizedWord += word[i].toUpperCase()
      foundLetter = true
    } else {
      capitalizedWord += word[i].toLowerCase()
    }
  }
  return capitalizedWord
}

function isException(word: string): boolean {
  const lists = [articles, conjunctions, prepositions]

  for (const list of lists) {
    if (list.includes(word)) {
      return true
    }
  }
  return false
}

function isFirst(sentenceArray: string[], i: number): boolean {
  const punctuation = [".", ",", "?", "!"]
  for (let j = i - 1; j >= 0; j -= 1) {
    if (!sentenceArray[j].match(/^\s*$/)) {
      if (punctuation.includes(sentenceArray[j])) {
        return true
      }
      return false
    }
  }
  return false
}

function convertSentence(sentence: string, style: string): string {
  const sentenceArray = sentenceToArray(sentence)
  const capitalizedSentenceArray = []
  const wordCount = sentenceArray.length
  for (let i = 0; i < wordCount; i += 1) {
    if (i === 0 || i === wordCount - 1 || isFirst(sentenceArray, i)) {
      capitalizedSentenceArray[i] = capitalizeWord(sentenceArray[i])
    } else if (sentenceArray[i - 1] === "-") {
      if (capitalizeHyphens.includes(style)) {
        capitalizedSentenceArray[i] = capitalizeWord(sentenceArray[i])
      } else {
        capitalizedSentenceArray[i] = sentenceArray[i]
      }
    } else if (!isException(sentenceArray[i])) {
      capitalizedSentenceArray[i] = capitalizeWord(sentenceArray[i])
    } else if (
      prepositions.includes(sentenceArray[i]) &&
      sentenceArray[i].length > 4 &&
      (style === "bluebook" ||
        style === "chicago" ||
        style === "mla" ||
        style === "wikipedia")
    ) {
      capitalizedSentenceArray[i] = capitalizeWord(sentenceArray[i])
    } else if (
      prepositions.includes(sentenceArray[i]) &&
      sentenceArray[i].length > 3 &&
      (style === "ap" || style === "nyt")
    ) {
      capitalizedSentenceArray[i] = capitalizeWord(sentenceArray[i])
    } else {
      capitalizedSentenceArray[i] = sentenceArray[i]
    }
  }

  const convertedSentence = capitalizedSentenceArray.join("")
  return convertedSentence
}

export default function toTitleCase(text: string, style: string): string {
  const sentences: string[] = text.toLowerCase().split("\n")
  const convertedSentences = []
  const sentenceCount = sentences.length
  for (let i = 0; i < sentenceCount; i += 1) {
    convertedSentences[i] = convertSentence(sentences[i], style)
  }
  return convertedSentences.join("\n")
}

/*

Receive text in any case
convert all to lowercase
split by newlines and make an array of sentences
for each sentence, do the following:
split by spaces and make an array of words
for each word, do the following:
if the word is in the smallWords array, do nothing
if the word is in the prepositions array, do nothing
if the word is in the articles array, do nothing
if the word is in the conjunctions array, do nothing
if the word is not in the smallWords, prepositions, articles, or conjunctions array,
or if the word is the first word of the sentence array,
or if the word is the last word of the sentence array,
capitalize the first letter of the word

join the words back into a sentence

join the sentences back into a paragraph
return the paragraph

*/
