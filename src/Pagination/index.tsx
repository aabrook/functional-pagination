import * as React from "react";
import { fromArray, Zipper } from "fp-ts/es6/Zipper";
import { isNone } from "fp-ts/lib/Option";
import { drop, take, takeLast } from 'ramda'

const Spacer = () => <span className="spacer">...</span>
const Pager = ({ children, onClick, className }) => <span className={ `pager ${className || ''}` } onClick={ onClick }>{ children }</span>

const Pages = ({ pages, leftCount, rightCount, onSelect }) => {
  const left = take(leftCount, pages)
  const right = takeLast(rightCount, drop(leftCount, pages))

  return (
    <>
      { left.map(i => <Pager onClick={() => onSelect(i)}>{i}</Pager>) }
      { (right.length > 0 && (left.length + right.length) < pages.length && <Spacer />) }
      { right.map(i => <Pager onClick={() => onSelect(i)}>{i}</Pager>) }
    </>
  )
}

export const Pagination = ({ count = 2, pages = [1], index = 1, boundsCount = 1, onSelect = () => {} }) => {
  const zipped = fromArray(pages)
    .chain(zipper => zipper.move((cur) => index - cur));

  if (isNone(zipped)) {
    return <Pager>{ 0 }</Pager>;
  }

  const { lefts, focus, rights } = zipped.getOrElse(null)
  return (
    <div className="paginator">
      <Pages pages={ lefts } leftCount={ boundsCount } rightCount={ count } onSelect={ onSelect } />
      <Pager className="focus">{ focus }</Pager>
      <Pages pages={ rights } leftCount={ count } rightCount={ boundsCount } onSelect={ onSelect } />
    </div>
  )
}
