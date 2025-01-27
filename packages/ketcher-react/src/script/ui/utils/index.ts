/****************************************************************************
 * Copyright 2021 EPAM Systems
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 ***************************************************************************/
import { escapeRegExp, filter as _filter, flow, reduce } from 'lodash/fp'
import { Option } from '../component/form/Select'

const GREEK_SIMBOLS = {
  Alpha: 'A',
  alpha: 'α',
  Beta: 'B',
  beta: 'β',
  Gamma: 'Г',
  gamma: 'γ'
}

const greekRe = new RegExp(
  '\\b' + Object.keys(GREEK_SIMBOLS).join('\\b|\\b') + '\\b',
  'g'
)

export function greekify(str: string): string {
  return str.replace(greekRe, (sym) => GREEK_SIMBOLS[sym])
}

export function filterLib(lib, filter: string) {
  console.warn('Filter', filter)
  const trimmedFilter = filter.trim()
  const re = new RegExp(escapeRegExp(greekify(trimmedFilter)), 'i')
  return flow(
    _filter(
      (item: any) =>
        !trimmedFilter ||
        re.test(greekify(item.struct.name)) ||
        re.test(greekify(item.props.group))
    ),
    reduce((res, item) => {
      if (!res[item.props.group]) res[item.props.group] = [item]
      else res[item.props.group].push(item)
      return res
    }, {})
  )(lib)
}

export function filterFGLib(lib, filter) {
  console.warn('Filter', filter)
  const trimmedFilter = filter.trim()
  const re = new RegExp(escapeRegExp(greekify(trimmedFilter)), 'i')
  const searchFunction = (item) => {
    const fields = [
      item.struct.name,
      item.props.abbreviation,
      item.props.name
    ].filter(Boolean)
    return fields.some((field) => re.test(greekify(field)))
  }
  return flow(
    _filter((item: any) => !trimmedFilter || searchFunction(item)),
    reduce((res, item) => {
      if (!res[item.props.group]) res[item.props.group] = [item]
      else res[item.props.group].push(item)
      return res
    }, {})
  )(lib)
}

export const getSelectOptionsFromSchema = (schema): Array<Option> => {
  return schema.enum.reduce((options, value, index) => {
    options.push({
      value,
      label: schema?.enumNames?.[index] ?? value
    })

    return options
  }, [])
}

export { RenderStruct } from './renderStruct'
export { fileOpener } from './fileOpener'
