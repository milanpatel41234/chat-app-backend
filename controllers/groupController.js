const  {group , user } = require('../models/db')

exports.postGroup = async(req , res)=>{
    try {
        const {name} = req.body;
        const adminId = req.user.id;
       const newGroup = await group.create({name , adminId});
      const response =  await req.user.addGroup(newGroup);
      return res.send(response);
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.getGroup = async(req , res)=>{
try {
    const userId = req.user.id;
    const response = await user.findByPk(userId, { include: 'groups' });
return res.send(response.groups);
} catch (error) {
    res.status(500).send(error);
}
}

exports.getMember = async(req , res)=>{
try {
    const userId = req.user.id;
    const groupId = req.query.group;
    const response = await group.findByPk(groupId, { include: 'users' });

return res.send({members:response.users , isAdmin:response.adminId===userId , adminId:response.adminId});
} catch (error) {
    res.status(500).send(error);
}
}

exports.addMember = async(req , res)=>{
try {
    const groupId = +req.query.group;
    const newMemberEmail = req.body.email;
    const findGroup =  group.findByPk(groupId);
    const findMember = user.findOne({where:{email:newMemberEmail}});
    const [foundGroup, foundMember] = await Promise.all([findGroup, findMember])
    if(!foundMember) return res.send({success:false ,message:'This email is not registered'});
   await foundMember.addGroup(foundGroup);
return res.send({success:true,message:'Added member successfully'});
} catch (error) {
    res.status(500).send(error);
}
}

exports.removeMember = async(req , res)=>{
try {
    const groupId = +req.query.group;
    const memberId = +req.query.member;
    const findGroup =  group.findByPk(groupId);
    const findMember = user.findByPk(memberId);
    const [foundGroup, foundMember] = await Promise.all([findGroup, findMember]);
    console.log('ffffffffff' , foundGroup , foundMember)
    if (foundMember && foundGroup) {
        await foundMember.removeGroup(foundGroup);
        res.send({message:'Member removed successfully' , success:true});
      } else {
        res.send({message:'User or Group not found.' , success:false});
      }

} catch (error) {
    res.status(500).send(error);
}
}
