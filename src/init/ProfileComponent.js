import React from 'react';
import { customAxios } from '../customAxios';

import { useRegister } from '../../AppContext';
import ProfilePresenter from './ProfilePresenter';
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
    } from './city';
import { TestScheduler } from 'jest';

class ProfileComponent extends React.Component {

    constructor(props) {
        super(props);
        console.log('@ProfileComponent');

        this.state = {
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

            setWhichItem: this.setWhichItem.bind(this),
            getWhichItem: this.getWhichItem.bind(this),
            selItem: this.selItem.bind(this),
            setRegion: this.setRegion.bind(this),
            verify: this.verify.bind(this),
            next: this.next.bind(this),

            nicknameVerify: this.nicknameVerify.bind(this),
            nicknameCheck: true,
        };
        
        for(let i=130; i<230; i++) {
            this.state.heightData.push(i);
        }
    }

    componentDidMount() {
        customAxios.get('/Profile/filter')
        .then( (res) => {
            //console.log(res.data);
            res.data.map(res => {
                switch(res.f_type) {
                    case '??????': this.setState({alcoholData: this.state.alcoholData.concat(res.f_name)}); break;
                    case '??????': this.setState({religionData: this.state.religionData.concat(res.f_name)}); break;
                    case '??????': this.setState({bodyData: this.state.bodyData.concat(res.f_name)}); break;
                    case '??????': this.setState({gradeData: this.state.gradeData.concat(res.f_name)}); break;
                    case '??????': this.setState({smokeData: this.state.smokeData.concat(res.f_name)}); break;
                }
            })
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
                /*case '??????': this.setState({selectedGrade: this.state.gradeData[index]}); break;
                case '??????': this.setState({selectedRegion: this.state.regionData[index]}); break;
                case '??????': this.setState({selectedBody: this.state.bodyData[index]}); break;
                case '??????': this.setState({selectedReligion: this.state.religionData[index]}); break;
                case '??????': this.setState({selectedSmoke: this.state.smokeData[index]}); break;
                case '??????': this.setState({selectedAlcohol: this.state.alcoholData[index]}); break;
                case '???': this.setState({selectedHeight: this.state.heightData[index]}); break;*/
                case '??????': { this.setState({selectedGrade:    this.state.gradeData[index]    , indexGrade : index }); break; }
                case '??????': { this.setState({selectedBody:     this.state.bodyData[index]     , indexBody : index }); break; }
                case '??????': { this.setState({selectedReligion: this.state.religionData[index] , indexReligion : index }); break; }
                case '??????': { this.setState({selectedSmoke:    this.state.smokeData[index]    , indexSmoke : index }); break; }
                case '??????': { this.setState({selectedAlcohol:  this.state.alcoholData[index]  , indexAlcohol : index }); break; }
                case '???'  : { this.setState({selectedHeight:   this.state.heightData[index]   , indexHeight : index }); break; }
            }

              
        }
        if(index != -1) {
            switch(this.state.whichItem) {
                case '??????': this.state.selectedRegion != '' ? this.setWhichItem('') : this.setWhichItem('??????'); break;
                case '???'  : this.state.selectedBody != '' ? this.setWhichItem('') : this.setWhichItem('??????'); break;
                case '??????': this.state.selectedReligion != '' ? this.setWhichItem('') : this.setWhichItem('??????'); break;
                case '??????': this.state.selectedSmoke != '' ? this.setWhichItem('') : this.setWhichItem('??????'); break;
                case '??????': this.state.selectedAlcohol != '' ? this.setWhichItem('') : this.setWhichItem('??????'); break;
                case '??????': this.setWhichItem(''); break;
            }
        } else {
            this.setState({whichItem: ''});
        }
    }

    setRegion(param, index) {
        if(param == '??????') {
            this.setState({selectedRegion: this.state.regionData[index]});

            switch(this.state.regionData[index]) {
                case '???????????????' : this.setState({regionAddonData: seoul}); break;
                case '???????????????' : this.setState({regionAddonData: busan}); break;
                case '???????????????' : this.setState({regionAddonData: daegu}); break;
                case '???????????????' : this.setState({regionAddonData: incheon}); break;
                case '???????????????' : this.setState({regionAddonData: gwangju}); break;
                case '???????????????' : this.setState({regionAddonData: daejeon}); break;
                case '???????????????' : this.setState({regionAddonData: ulsan}); break;
                case '?????????????????????' : this.setState({regionAddonData: []}); break;
                case '?????????' : this.setState({regionAddonData: gyeonggi}); break;
                case '?????????' : this.setState({regionAddonData: gangwon}); break;
                case '????????????' : this.setState({regionAddonData: chungcheongbuk}); break;
                case '????????????' : this.setState({regionAddonData: chungcheongnam}); break;
                case '????????????' : this.setState({regionAddonData: jeollabuk}); break;
                case '????????????' : this.setState({regionAddonData: jeollanam}); break;
                case '????????????' : this.setState({regionAddonData: gyeongsangbuk}); break;
                case '????????????' : this.setState({regionAddonData: gyeongsangnam}); break;
                case '?????????????????????' : this.setState({regionAddonData: jeju}); break;
            }  
        } else {
            this.setState({selectedRegionAddon: this.state.regionAddonData[index]});
            this.state.selectedHeight != '' ? this.setWhichItem('') : this.setWhichItem('???');
        }
    }

    nicknameVerify(text) {
        if(text.length < 2) return false;

        customAxios.post('/Auth/check/', {
            nickname: text,
        }).then((res) => {
            if(!res.data.result) { // ????????? ???????????????
                this.setState({
                    nicknameCheck: false,
                });
            } else {
                this.setState({
                    nicknameCheck: true,
                });
                useRegister.getState().setNickname(text);
            }
        }).catch((err) => {

        })
    }

    verify() {
        if (this.state.selectedGrade    != '' &&
            this.state.selectedRegion   != '' &&
            this.state.selectedRegionAddon  != '' &&
            this.state.selectedBody     != '' &&
            this.state.selectedReligion != '' &&
            this.state.selectedSmoke    != '' &&
            this.state.selectedAlcohol  != '' &&
            this.state.selectedHeight   != '' &&
            useRegister.getState().nickname != '') {

            //useRegister.getState().setName();
            //useRegister.getState().setBirth();
            useRegister.getState().setEdu(this.state.indexGrade);
            useRegister.getState().setRegion(this.state.selectedRegion + ' ' + this.state.selectedRegionAddon);
            useRegister.getState().setHeight(this.state.selectedHeight);
            useRegister.getState().setBody(this.state.indexBody);
            useRegister.getState().setReligion(this.state.indexReligion);
            useRegister.getState().setSmoke(this.state.indexSmoke);
            useRegister.getState().setDrinking(this.state.indexAlcohol);

            useRegister.getState().doRegister();
            setTimeout(() => {this.next()}, 500);
            
        }        
    }

    next() {
        this.props.navigation.popToTop();
    }

    render() {
        return(
            <ProfilePresenter
                props={this.props}
                state={this.state}
            />
        );
    }
}

export default ProfileComponent;