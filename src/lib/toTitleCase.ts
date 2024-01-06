const smallWords = [
  "a",
  "an",
  "and",
  "as",
  "at",
  "but",
  "by",
  "en",
  "for",
  "if",
  "in",
  "nor",
  "of",
  "on",
  "or",
  "per",
  "the",
  "to",
  "v.",
  "via",
]
const punctuations = /([^\w\s])/g
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

function lastNonSpaceChar(arr: string[], index: number): string {
  for (let i = index - 1; i >= 0; i -= 1) {
    if (arr[i].trim() !== "") {
      return arr[i]
    }
  }
  return ""
}

function convertSentence(sentence: string): string {
  const sentenceArray = sentenceToArray(sentence)
  const capitalizedSentenceArray = []
  const wordCount = sentenceArray.length
  for (let i = 0; i < wordCount; i += 1) {
    if (
      i === 0 ||
      i === wordCount - 1 ||
      !(
        smallWords.includes(sentenceArray[i]) ||
        articles.includes(sentenceArray[i]) ||
        conjunctions.includes(sentenceArray[i]) ||
        prepositions.includes(sentenceArray[i])
      )
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
    convertedSentences[i] = convertSentence(sentences[i])
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
