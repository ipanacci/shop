/* Function which takes in input :

"records" : the results which has to appear in the desired page (|records| = limit)
"page" : the number of the desired page (all result of page are given in records)
"count" : the number of all results
"limit" : the number mex of results per page

and gives as output:

{
    records : records,
    nbRecords : count, <--- the total number of results ! 
    page : {
        current : page,
        previous: (page > 1) ? page-1 : null,
        next: (page < last) ? page+1 : null,
        last: last (if count === 0 then last === 0 )
    }
}
*/

export function dataPage(records, page, count, limit) {
    page = parseInt(page);
    let last = Math.ceil(count/limit);
    return {
        records,
        nbRecords : count,
        page : {
            current : page,
            previous: (page > 1) ? page-1 : null,
            next: (page < last) ? page+1 : null,
            last: last
        }
    };
}

export function selectFromFields (fields) {
    return fields.reduce((result, item) => {
      if (item !== "__typename") {
        result[item] = 1;
      }
      return result;
    }, {});
  };

export default dataPage;
