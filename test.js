require('machinepack-github')
.getOrganizationRepos({
  user: 'balderdashy',
  // user: 'vlahupetar',
  limit: 10
})
// .cache({
//   ttl: 3600,
//   model: Cursor
// })
.exec({
  success: function (datas){
    if (datas.length) {
      console.log('IT WORKED! Here\'s that data:\n',datas[0].owner);
    }
  },
  error: function (err){
    console.log('OH NO!', err);
  }
});
