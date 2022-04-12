import axios from 'axios'

const url = 'http://localhost:3001/poll';

class PollService {

  newPoll(data){
    const body = {subject:data.subject,password:data.password,options:data.options,expires:data.expires,format:data.format};
    return axios.post(url + '/newpoll', body).then((res)=>{
      return res.data
    }).catch((err)=>{
      return err
    })
  }

  getPoll(id){
    return axios.get(`${url}/${id}`).then((res)=>{
      return res.data
    }).catch((err)=>{
      return err
    })
  }

  checkVote(id){
    if(localStorage.getItem(id) === 'voted') {
      return true;
    }
    return false;
  }

  castVote(id,option){
      if(this.checkVote(id) === true)  {
        throw new Error('Already Voted')
      } else {
        return axios.patch(`${url}/${id}/${option}`).then((res)=>{
          if(!res.data?.error){
            localStorage.setItem(id, 'voted')
            return res.data
          }
          throw new Error(res.data.error)
        }).catch((err) => {
          throw new Error(err.message)
        })
      }
  }

}

export default new PollService();
