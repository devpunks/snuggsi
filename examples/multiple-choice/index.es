Element `multiple-choice`

(class extends HTMLElement {

  initialize () {
    this.context.current = 0

    this.context.questions_and_answers =
      [
        {
          question: 'what popular tool for developing the client side application should we use?',
          answers: ['React', 'Ember.js', 'Vue', 'Angular', 'jQuery'],
          // answer: undefined // There is no answer hehe
        },

        {
          question: 'What city is known as "The Big 🍎 Apple ?"',
          answers: ['Seattle, WA', 'Skokie, IL', 'New York City'],
          answer: 2
        }
      ]
  }

  onidle () {
    const
      previous = this.select
        `footer button:first-of-type`

    , next = this.select
        `footer button:last-of-type`

    , beginning =
        this.context.current == 0

    , end =
        this.context.current ==
          (this.context.questions_and_answers.length -1)

    this.enable (beginning, previous)
    this.enable (end, next)
  }

  // helpers
  enable (predicate, element) {
    predicate
      ? element.disabled = true
      : element.disabled = false

  }

  // handlers
  onprevious ()
    { this.context.current -- }

  onnext ()
    { this.context.current ++ }


  // properties
  get current ()
    { return this.context.current }

  get question () {
    return this.context
      .questions_and_answers
        [this.current].question
  }

  get answers () {
    return this.context
      .questions_and_answers
        [this.current].answers
  }

})


