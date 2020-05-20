library(twitteR)
df <-TwitterData
df$created
df$text <- iconv(df$text, "UTF-8", "ASCII", sub="")
df$text <- tolower(df$text)
df$text <- gsub("http[^[:space:]]*", "", df$text)
df$text <- gsub("@[^[:space:]]*", "", df$text)
df$text <- gsub("[^[:alpha:][:space:]]*", "", df$text)
df$text <- gsub("\n", " ", df$text)
df$text <- gsub("  ", " ", df$text)
df$text <- gsub("tropic", "", df$text)
df$text <- gsub("depress", "", df$text)
df$text <- gsub("harvey", "", df$text)
twitter <- unique(df$text)

# 
tweeter_corpus <- Corpus(VectorSource(twitter))
myStopwords <- c(stopwords('english'), c("al","ion","gu","kno","amp","ap","ne","w","via","us","near","now","rt","will"))
tweeter_corpus <- tm_map(tweeter_corpus, removeWords, myStopwords)
tweeter_corpus <- tm_map(tweeter_corpus, stripWhitespace)
tweeter_corpus_copy <- tweeter_corpus
tweeter_corpus <- tm_map(tweeter_corpus, stemDocument) # stem words
tweeter_corpus <- Corpus(VectorSource(tweeter_corpus))
tdm <- TermDocumentMatrix(tweeter_corpus,control = list(wordLengths = c(1, Inf)))
(freq.terms <- findFreqTerms(tdm, lowfreq = 20))
term.freq <- rowSums(as.matrix(tdm))
term.freq <- subset(term.freq, term.freq >= 20)
df <- data.frame(term = names(term.freq), freq = term.freq)

ggplot(df, aes(x=term, y=freq)) + geom_bar(stat="identity") +
  xlab("Terms") + ylab("Count") + coord_flip() +
  theme(axis.text=element_text(size=7))

# 
library("RColorBrewer")
m <- as.matrix(tdm)
word.freq <- sort(rowSums(m), decreasing = T)
pal <- brewer.pal(9, "BuGn")[-(1:4)]
library(wordcloud)
wordcloud(words = names(word.freq), freq = word.freq, min.freq = 10, random.order = F, colors = pal)

dtm <- as.DocumentTermMatrix(tdm)
require(topicmodels)
lda <- LDA(dtm, k = 8) # find 8 topics
term <- terms(lda, 7) # first 7 terms of every topic
(term <- apply(term, MARGIN = 2, paste, collapse = ", "))
topics <- topics(lda) # 1st topic identified for every document (tweet)

