import { extendObservable } from "mobx";

export default class Create {
  constructor (survey) {
    this.surveyStore = survey
    extendObservable(this, {
      survey: {}
    })
  }

  createNew () {
    this.survey = {}
  }

  setInfos (title, desc, icon, expiresAt = null) {
    this.survey.title = title
    this.survey.desc = desc
    this.survey.icon = icon
    if (expiresAt) {
      this.survey.expiresAt = expiresAt
    }
  }
}