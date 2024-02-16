import request from '@/utils/request'
const url = 'http://127.0.0.1:3333/'
// train page
export function startTrain(data) {
  return request({
    url: `${url}SilasGUI/starttrain`,
    method: 'post',
    data
  })
}

export function getTrainResult() {
  return request({
    url: `${url}SilasGUI/trainPage/getTrainResult`,
    method: 'get'
  })
}

export function getTrainTreeData() {
  return request({
    url: `${url}SilasGUI/trainPage/getTreeData`,
    method: 'get'
  })
}

// cross validation page
export function getValRes(){
  return request({
    url: `${url}SilasGUI/testPage/getValResult`,
    method: 'get'
  })
}
export function startValidation(data) {
  return request({
    url: `${url}SilasGUI/startvalidation`,
    method: 'post',
    data
  })
}


export function getTestTreeData() {
  return request({
    url: `${url}SilasGUI/testPage/getTreeData`,
    method: 'get'
  })
}

export function prediction(data){
  return request({
    url: `${url}/SilasGUI/predictPage/prediction`,
    method: 'post',
    data
  })
}


export function getPredRes(param) {
  return request({
    url: `${url}SilasGUI/predictPage/getRes?type=${param.type}`,
    method: 'get'
  })
}

export function generateGridSearchSetting() {
  return request({
    url: `${url}SilasGUI/gridSearchPage/gengridSearch`,
    method: 'get'
  })
}

export function getGridSearchResult() {
  return request({
    url: `${url}SilasGUI/gridSearchPage/getGridSearchRes`,
    method: 'get'
  })
}

export function startGridsearch(data){
  return request({
    url: `${url}SilasGUI/gridSearchPage/gridSearch`,
    method: 'post',
    data
  })
}

export function startExplanation(data){
  return request({
    url: `${url}SilasGUI/extensionPage/explanation`,
    method: 'post',
    data
  })
}

export function featureImportance(data){
  return request({
    url: `${url}SilasGUI/featurePage/featureImportance`,
    method: 'post',
    data
  })
}

// datshboard

export function getCurStastic(){
  return request({
    url: `${url}SilasGUI/getStastisticData`,
    method: 'get'
  })
}

