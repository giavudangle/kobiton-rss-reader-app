import { IActionCreator, IArticle } from "../../types";
import { FEED_ARTICLE } from "../action-types/article";

interface IArticleState {
  items : IArticle[]
}


const INITIAL_STATE : IArticleState = {
  items : []
}

export const articleReducer = (state = INITIAL_STATE,action : IActionCreator) => {
  switch(action.type){
    case FEED_ARTICLE:
      return state;
    default:
      return state;
  }
}


