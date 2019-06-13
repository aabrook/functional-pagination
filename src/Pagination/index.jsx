import * as React from "react";
import { fromArray } from "fp-ts/es6/Zipper";
import { drop, take, takeLast } from 'ramda'

const Spacer = () => <span className="spacer">...</span>
const Pager = ({ children, onClick, className }) => <span className={ `pager ${className || ''}` } onClick={ onClick }>{ children }</span>

const BoundaryPages = ({ pages, leftCount, rightCount, onSelect }) => {
  const left = take(leftCount, pages)
  const right = takeLast(rightCount, drop(leftCount, pages))

  return (
    <>
      { left.map(i => <Pager key={ `left${i}` } onClick={() => onSelect(i)}>{i}</Pager>) }
      { (right.length > 0 && (left.length + right.length) < pages.length && <Spacer />) }
      { right.map(i => <Pager key={ `right${i}` } onClick={() => onSelect(i)}>{i}</Pager>) }
    </>
  )
}

const Pages = ({ lefts, focus, rights, boundsCount, count, onSelect }) => (
  <div className="paginator">
    <BoundaryPages pages={ lefts } leftCount={ boundsCount } rightCount={ count } onSelect={ onSelect } />
    <Pager className="focus">{ focus }</Pager>
    <BoundaryPages pages={ rights } leftCount={ count } rightCount={ boundsCount } onSelect={ onSelect } />
  </div>
)

export const Pagination = ({ pages = [], index = 1, ...props }) => {
  const zipped = fromArray(pages)
    .chain(zipper => zipper.move((cur) => index - cur));

  return zipped
    .map(zip => (<Pages {...zip} {...props} />))
    .getOrElse(<Pager>{ 0 }</Pager>)
}
