import React from 'react';
import { customAxios } from '../customAxios';
import ImagePicker from 'react-native-image-crop-picker';

import ProfileModifyPresenter from './ProfileModifyPresenter';

import { 
    sido,
    gangwon,
    gyeonggi,
    gyeongsangnam,
    gyeongsangbuk,
    gwangju,
    daegu,
    daejeon,
    busan,
    seoul,
    ulsan,
    incheon,
    jeollanam,
    jeollabuk,
    jeju,
    chungcheongnam,
    chungcheongbuk
    } from '../init/city';

class ProfileModifyComponent extends React.Component {

    constructor(props) {
        super(props);
        console.log('@ProfileModifyComponent');

        this.state = {
            // imageArea
            curModalID: -1,
            modalVisiable: false,
            setModalVisiable: this.setModalVisiable.bind(this),
            mainPic: '',
            requirePic: ['',''],
            extraPic: ['','',''],
            picURL: '',

            // infoArea
            whichItem: '',
            gradeData: [],
            regionData: sido,
            regionAddonData: [],
            bodyData: [],
            religionData: [],
            smokeData: [],
            alcoholData: [],
            heightData: [],

            selectedGrade: '',
            selectedRegion:'',
            selectedRegionAddon:'',
            selectedBody:'',
            selectedReligion:'',
            selectedSmoke:'',
            selectedAlcohol:'',
            selectedHeight:'',

            indexGrade: '',
            indexRegion:'',
            indexBody:'',
            indexSmoke:'',
            indexAlcohol:'',
            indexHeight:'',
            indexReligion:'',

            name: '',
            email: '',
            sex: 0,
            phone: '',
            birth: '',
            eduname: '',
            nickname: '',

            picURL: 'http://192.168.1.243:4001/media/image/?imageName=',

            setWhichItem: this.setWhichItem.bind(this),
            getWhichItem: this.getWhichItem.bind(this),
            selItem: this.selItem.bind(this),
            setRegion: this.setRegion.bind(this),

            // introArea

            character: '',
            aboutMe: '',

            setCharacter: this.setCharacter.bind(this),
            setAboutMe: this.setAboutMe.bind(this),
            setEduName: this.setEduName.bind(this),

            originInfo: {},
            forUploadInfo: {},

            uploadData: this.uploadData.bind(this),
        };

        
    }

    componentDidMount() {
        this.props.navigation.getParent().setOptions({
            tabBarStyle: { display: "none" },
        });

        customAxios.get('/Profile/myfilter')
        .then( (res) => {
            //console.log(res.data.my);
            res.data.filter.map(res => {
                switch(res.f_type) {
                    case '음주': this.setState({alcoholData: this.state.alcoholData.concat(res.f_name)}); break;
                    case '종교': this.setState({religionData: this.state.religionData.concat(res.f_name)}); break;
                    case '체형': this.setState({bodyData: this.state.bodyData.concat(res.f_name)}); break;
                    case '학력': this.setState({gradeData: this.state.gradeData.concat(res.f_name)}); break;
                    case '흡연': this.setState({smokeData: this.state.smokeData.concat(res.f_name)}); break;
                }
            })
            let my = res.data.my;

            for(let i=130; i<230; i++) {
                this.state.heightData.push(i);
            }
            
            this.setState({
                selectedGrade: this.state.gradeData[my.edu],
                selectedRegion: my.live.split(' ')[0],
                selectedRegionAddon: my.live.split(' ')[1],
                selectedBody: this.state.bodyData[my.body],
                selectedReligion: this.state.religionData[my.religion],
                selectedSmoke: this.state.smokeData[my.smoke],
                selectedAlcohol: this.state.alcoholData[my.alcohol],
                selectedHeight: my.height,
                name: my.name,
                sex: my.sex,
                phone: my.phone,
                birth: my.birth,
                email: my.email,
                eduname: my.eduname,
                nickname: my.nickname,
                character: my.character,
                aboutMe: my.selfintro,

                mainPic: my.mainpic,
                requirePic: Object.values(my.requirepic),
                extraPic: Object.values(my.extrapic),

                originInfo: {
                    Grade: my.edu,
                    Region: my.live.split(' ')[0],
                    RegionAddon: my.live.split(' ')[1],
                    Body: my.body,
                    Religion: my.religion,
                    Smoke: my.smoke,
                    Alcohol: my.alcohol,
                    Height: my.height,
                    eduname: my.eduname,
                    character: my.character,
                    aboutMe: my.selfintro,
                },

                forUploadInfo: {
                    Grade: my.edu,
                    Region: my.live.split(' ')[0],
                    RegionAddon: my.live.split(' ')[1],
                    Body: my.body,
                    Religion: my.religion,
                    Smoke: my.smoke,
                    Alcohol: my.alcohol,
                    Height: my.height,
                    eduname: my.eduname,
                    character: my.character,
                    aboutMe: my.selfintro,
                }
            });
        }).catch( (error) =>{
            console.log('ERROR, @ProfileComponent <filter>', error);
            this.setState({
                error: error
            })
        });
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
        this.props.navigation.getParent().setOptions({
            tabBarStyle: { display: "flex" },
        });
    }

    setModalVisiable(state, id) {
        this.setState({
            modalVisiable: state,
            curModalID: id,
        });
    }

    setWhichItem(param) {
        this.setState({
            whichItem: param,
        });
    }   

    getWhichItem() {
        return this.state.whichItem;
    }

    selItem(param, index) {
        if(param) {
            switch(this.state.whichItem) {
                case '학력': { 
                    this.setState({selectedGrade:    this.state.gradeData[index]    , indexGrade : index });
                    this.state.forUploadInfo.Grade = index;
                    break; 
                }
                case '체형': { 
                    this.setState({selectedBody:     this.state.bodyData[index]     , indexBody : index }); 
                    this.state.forUploadInfo.Body = index;
                    break; 
                }
                case '종교': { 
                    this.setState({selectedReligion: this.state.religionData[index] , indexReligion : index }); 
                    this.state.forUploadInfo.Religion = index;
                    break; 
                }
                case '흡연': { 
                    this.setState({selectedSmoke:    this.state.smokeData[index]    , indexSmoke : index }); 
                    this.state.forUploadInfo.Smoke = index;
                    break; 
                }
                case '음주': { 
                    this.setState({selectedAlcohol:  this.state.alcoholData[index]  , indexAlcohol : index }); 
                    this.state.forUploadInfo.Alcohol = index;
                    break; 
                }
                case '키'  : { 
                    this.setState({selectedHeight:   this.state.heightData[index]   , indexHeight : index }); 
                    this.state.forUploadInfo.Height = index;
                    break; 
                }
            }

              
        }
        if(index != -1) {
            switch(this.state.whichItem) {
                case '학력': this.state.selectedRegion != '' ? this.setWhichItem('') : this.setWhichItem('지역'); break;
                case '키'  : this.state.selectedBody != '' ? this.setWhichItem('') : this.setWhichItem('체형'); break;
                case '체형': this.state.selectedReligion != '' ? this.setWhichItem('') : this.setWhichItem('종교'); break;
                case '종교': this.state.selectedSmoke != '' ? this.setWhichItem('') : this.setWhichItem('흡연'); break;
                case '흡연': this.state.selectedAlcohol != '' ? this.setWhichItem('') : this.setWhichItem('음주'); break;
                case '음주': this.setWhichItem(''); break;
            }
        } else {
            this.setState({whichItem: ''});
        }
    }

    setRegion(param, index) {
        if(param == '시도') {
            this.setState({selectedRegion: this.state.regionData[index]});
            this.state.forUploadInfo.Region = this.state.regionData[index];
            
            switch(this.state.regionData[index]) {
                case '서울특별시' : this.setState({regionAddonData: seoul}); break;
                case '부산광역시' : this.setState({regionAddonData: busan}); break;
                case '대구광역시' : this.setState({regionAddonData: daegu}); break;
                case '인천광역시' : this.setState({regionAddonData: incheon}); break;
                case '광주광역시' : this.setState({regionAddonData: gwangju}); break;
                case '대전광역시' : this.setState({regionAddonData: daejeon}); break;
                case '울산광역시' : this.setState({regionAddonData: ulsan}); break;
                case '세종특별자치시' : this.setState({regionAddonData: []}); break;
                case '경기도' : this.setState({regionAddonData: gyeonggi}); break;
                case '강원도' : this.setState({regionAddonData: gangwon}); break;
                case '충청북도' : this.setState({regionAddonData: chungcheongbuk}); break;
                case '충청남도' : this.setState({regionAddonData: chungcheongnam}); break;
                case '전라북도' : this.setState({regionAddonData: jeollabuk}); break;
                case '전라남도' : this.setState({regionAddonData: jeollanam}); break;
                case '경상북도' : this.setState({regionAddonData: gyeongsangbuk}); break;
                case '경상남도' : this.setState({regionAddonData: gyeongsangnam}); break;
                case '제주특별자치도' : this.setState({regionAddonData: jeju}); break;
            }  
        } else {
            this.state.forUploadInfo.RegionAddon = this.state.regionAddonData[index]
            this.setState({selectedRegionAddon: this.state.regionAddonData[index]});
            this.state.selectedHeight != '' ? this.setWhichItem('') : this.setWhichItem('키');
        }
    }

    setEduName(param) {
        this.state.forUploadInfo.eduname = param;
        this.setState({
            eduname: param,
        });
    }

    setCharacter(param) {
        this.state.forUploadInfo.character = param;
        this.setState({
            character: param,
        });
    }

    setAboutMe(param) {
        this.state.forUploadInfo.aboutMe = param;
        this.setState({
            aboutMe: param,
        });
    }

    uploadData() {
        if(JSON.stringify(this.state.originInfo) == JSON.stringify(this.state.forUploadInfo)) {
            return ;
        } else {
            customAxios.put('/Profile/profile/', {
                info: this.state.forUploadInfo,
            })
            .then((res) => {
                
            }).catch((err) => {

            })
        }
    }

    render() {
        return(
            <ProfileModifyPresenter
                props={this.props}
                state={this.state}
            />
        );
    }
}

export default ProfileModifyComponent;