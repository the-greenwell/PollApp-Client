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

  castVote(id,option){
    return axios.patch(`${url}/${id}/${option}`).then((res)=>{
      return res.data
    }).catch((err)=>{
      return err
    })
  }

}

export default new PollService();
