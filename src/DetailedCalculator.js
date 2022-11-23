//include a settings component that will at least allow for a personalized output with fixed decimals from 0-15;
// personalized screen color and/or sounds playing upon click;
// add the ability to use the keypad with the onkeypress / onkeydown function;
// add the arc trig and hyperbolic trig functions in secondary and tertiary component made available onclick via toggle?;
// allow for multiple decimals in parenthesis
// there are bugs with the x^y function
// add a fadeout animation to the error message

import './index.css';
import React, { Component } from 'react';
class DetailedCalculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previousVal: '',
      currentVal: '',
      errorMessage: '',
      variableType: 'none', // think radians, degrees, gradient, constants, number, operator, etc
      parenthesisCount: 0 // countLeft - countRight, if not equal to zero block previousVal movement
    } 
  }
   numbers = (e) => {
    // if a constant is present, don't allow numbers to be appended to it
    if(this.state.variableType === 'constant'){
      this.setState({
        errorMessage: 'Constants cannot be altered, only operated on!'
      })
    }
    // if something is there that is not zero allow numbers to be appended
     else if(this.state.currentVal !== '' 
      && this.state.currentVal !== '0'){
      this.setState({
        currentVal: this.state.currentVal + e.target.value,
        variableType: 'number'
      })
    }
        // if only zero is present, replace it with the button pressed
    else if(this.state.currentVal === '' 
      || this.state.currentVal === '0'){
      this.setState({
        currentVal: e.target.value,
        variableType: 'number'
      })
    }
    };

    operators = (e) => {
      if(this.state.currentVal === '' 
        && this.state.previousVal === ''){
          this.setState({
            errorMessage: 'Enter a number first!',
            variableType: 'operator'
          })
      }

      else if(this.state.currentVal === '' 
        && isNaN(this.state.previousVal[this.state.previousVal.length])===true) {
        // says that if the last point of entry is an operator and so too is the current button, then replace
        // the last entry with current operator
          this.setState({
            previousVal: this.state.previousVal.slice(0 , this.state.previousVal.length-1) + e.target.value,
            variableType: 'operator'
          })
      }

      else if(this.state.currentVal !== '' && this.state.parenthesisCount === 0){
          this.setState({
            previousVal: this.state.previousVal + this.state.currentVal  + e.target.value,
            currentVal: '',
            variableType: 'operator'
          })
      }
      else if(this.state.currentVal !== '' && this.state.parenthesisCount !== 0){
        this.setState({
          currentVal: this.state.currentVal + e.target.value,
          variableType: 'operator'
        })
      }
    }

  decimal = (e) => {
    if(this.state.currentVal.includes('.') === false){
        this.setState({
        currentVal: this.state.currentVal + e.target.value,
        variableType: 'decimal'
      })
    }
    else if(this.state.currentVal.includes('.') === true){
      this.setState({
        errorMessage: "Only 1 decimal point allowed!" 
      })
    }
  }  

  backspace = () => {
    if(this.state.currentVal.length === 0){
      this.setState({
        errorMessage: "There's nothing I can do here..."
      })
    }
    else if(this.state.currentVal.length > 0){
      this.setState({
        currentVal: this.state.currentVal.slice(0, this.state.currentVal.length-1),
        variableType: 'none'
      })
    }
  };

  allClear = () => {
    this.setState({
      currentVal: '',
      previousVal: '',
      errorMessage: '',
      variableType: 'none',
      parenthesisCount: 0,
    })
  };
  
  clear = () => {
    this.setState({
      currentVal: '',
      errorMessage: '',
      variableType: 'none',
      parenthesisCount: 0,
    })
  };

  equals = () =>{
    if(this.state.previousVal === '' 
      || this.state.currentVal === '' 
      || (isNaN(this.state.currentVal)===true && (this.state.parenthesisCount !== 0)) 
      || this.state.parenthesisCount !==0){
      this.setState({
        errorMessage: 'Incorrect syntax / no operation present'
      })
    }
    else if(this.state.previousVal !== '' 
      && this.state.parenthesisCount === 0){
        let x = this.state.previousVal + this.state.currentVal;
        this.setState({

        // eslint-disable-next-line
          currentVal: eval(x.replace(/--/g, '+')).toFixed(9),
          previousVal: '',
          errorMessage: '',
          variableType: 'none',
          parenthesisCount: 0,
})
    }
    };

   zero = (e) =>{
    if(this.state.variableType === 'constant'){
      this.setState({
        errorMessage: 'Constants cannot be altered, only operated on!'
      })
    }
    else if(this.state.currentVal === ''){
      this.setState({
        errorMessage: '',
        currentVal: e.target.value,
        variableType: 'number'
      })
    }
    else if(this.state.currentVal.includes('.') === true){
      this.setState({
        errorMessage: '',
        currentVal: this.state.currentVal + e.target.value,
        variableType: 'number'
      })
    }
    else if(this.state.currentVal === '0'){return}
    else if(this.state.currentVal.match(/[1-9]/g).length >= 1){
      this.setState({
        currentVal: this.state.currentVal + e.target.value,
        variableType: 'number'
      })
}
  }

  parenthesisLeft = (e) => {
    this.setState({
      currentVal: this.state.currentVal + e.target.value,
      errorMessage: '',
      parenthesisCount: this.state.parenthesisCount + 1,
    })
  };
  parenthesisRight = (e) => {
    let countRight = 0;
    let countLeft = 0;
    for(let i=0; i < this.state.currentVal.length; i++){
      if(this.state.currentVal[i] === '('){
        countLeft = countLeft + 1
      }
      else if(this.state.currentVal[i]=== ')'){
        countRight = countRight + 1
      }
    }
    if(countLeft > countRight){
    this.setState({
      errorMessage: '',
      currentVal: this.state.currentVal + e.target.value,
      parenthesisCount: this.state.parenthesisCount -1,
    })
    }
    else if(countLeft <= countRight){
      this.setState({
        errorMessage: 'Incorrect Syntax'
    })
    }
  };

pozneg = () => {
  if(this.state.currentVal === '0' || this.state.currentVal === ''){
    this.setState({
      errorMessage: "Add a non-zero number first!"
    })
  }
  else if(this.state.currentVal !== '0'){
    this.setState({
      currentVal: -this.state.currentVal
    })
  }
};

constants = (e) => {

  if(this.state.currentVal === ''){
    this.setState({
      currentVal: e.target.value,
      variableType: 'constant'
    })
  }
  else if(this.state.currentVal !== '' && this.state.variableType !== 'number' && this.state.variableType !== 'constant'){
    this.setState({
      variableType: 'constant',
      currentVal: this.state.currentVal + e.target.value,
    })
  }
  else if(this.state.currentVal !== '' && (this.state.variableType === 'number' || this.state.variableType === 'constant')){
    this.setState({
      errorMessage: 'Invalid syntax' 
    })
  }
};

sin = () => {
  if(this.state.currentVal !== ''){
  this.setState({
    currentVal: Math.sin(this.state.currentVal).toFixed(15)
  })
}
else if(this.state.currentVal === ''){
  this.setState({
    errorMessage: 'Enter radians first!'
  })
}
};

cos = () => {
  if(this.state.currentVal !== ''){
  this.setState({
    currentVal: Math.cos(this.state.currentVal)
  })
}
else if(this.state.currentVal === ''){
  this.setState({
    errorMessage: 'Enter radians first!'
  })
}
};

tan = () => {
  if(this.state.currentVal !== ''){
  this.setState({
    currentVal: Math.sin(this.state.currentVal)/ Math.cos(this.state.currentVal)
  })
}
else if(this.state.currentVal === ''){
  this.setState({
    errorMessage: 'Enter radians first!'
  })
}
};

csc = () => {
  if(this.state.currentVal !== ''){
  this.setState({
    currentVal: 1/Math.sin(this.state.currentVal)
  })
}
else if(this.state.currentVal === ''){
  this.setState({
    errorMessage: 'Enter radians first!'
  })
}
};

sec = () => {
  if(this.state.currentVal !== ''){
  this.setState({
    currentVal: 1/Math.cos(this.state.currentVal)
  })
}
else if(this.state.currentVal === ''){
  this.setState({
    errorMessage: 'Enter radians first!'
  })
}
};

cot = () => {
  if(this.state.currentVal !== ''){
  this.setState({
    currentVal: Math.cos(this.state.currentVal)/Math.sin(this.state.currentVal)
  })
}
else if(this.state.currentVal === ''){
  this.setState({
    errorMessage: 'Enter radians first!'
  })
}
};
logBaseTen = () =>{
  if(this.state.currentVal !== ''){
    this.setState({
      currentVal: Math.log10(this.state.currentVal)
    })
  }
};

naturalLog = () =>{
if(this.state.currentVal !== ''){
  this.setState({
    currentVal: Math.log(this.state.currentVal)
  })
}
 }
 absoluteValue = () =>{
  if(this.state.currentVal !== ''){
    this.setState({
      currentVal: Math.abs(this.state.currentVal)
    })
  }
 }
  render() { 
    return ( 
  <>
  <div className='container'>
    <div className='interface'>
      <div className='branding'>Paracrine Solutions<img src="https://img.icons8.com/sf-regular/344/peptide.png" alt='https://www.google.com' /></div>
      <div className='screen-container'>
        <div className='equation'>{this.state.previousVal}</div>
        <div className='input'>{this.state.currentVal}</div>
        <div className='error-message'>{this.state.errorMessage}</div>
      </div>
      <div className='button-container'>
        <div className='first-row'>
          <button className='edits' onClick={this.backspace}>DEL</button>
          <button className='edits' onClick={this.allClear}>AC</button>
          <button className='edits' onClick={this.clear}>CE</button>
          <button className='edits' onClick={this.parenthesisLeft} value='('>(</button>
          <button className='edits' onClick={this.parenthesisRight} value=')'>)</button>
        </div>
        <div className='second-row'>
          <button className='trig-functions' onClick={this.sin}>sin()</button>
          <button className='trig-functions' onClick={this.cos}>cos()</button>
          <button className='trig-functions' onClick={this.tan}>tan()</button>
          <button className='numbers' onClick={this.numbers} value= {9}>9</button>
          <button className='numbers' onClick={this.numbers} value= {8}>8</button>
        </div>
        <div className='third-row'>
          <button className='trig-functions' onClick={this.csc}>csc()</button>
          <button className='trig-functions' onClick={this.sec}>sec()</button>
          <button className='trig-functions' onClick={this.cot}>cot()</button>
          <button className='numbers' onClick={this.numbers} value= {7}>7</button>
          <button className='numbers' onClick={this.numbers} value= {6}>6</button>
        </div>
        <div className='fourth-row'>
          <button className='constants' onClick={this.constants} value= {Math.PI}>pi</button>
          <button className='constants' onClick={this.constants} value= {Math.E}>e</button>
          <button className='operators' onClick={this.operators} value= '+'>+</button>
          <button className='numbers' onClick={this.numbers} value= {5}>5</button>
          <button className='numbers' onClick={this.numbers} value= {4}>4</button>
        </div>
        <div className='fifth-row'>  
          <button className='log-functions' onClick={this.naturalLog}>ln()</button>
          <button className='log-functions' onClick={this.logBaseTen}>log<sub>10</sub>()</button>
          <button className='operators' onClick={this.operators} value= '-'>-</button>
          <button className='numbers' onClick={this.numbers} value= {3}>3</button>
          <button className='numbers' onClick={this.numbers} value= {2}>2</button>
        </div>
        <div className='sixth-row'>
          <button className='special-functions' onClick={this.operators} value= '**'>x^y</button>
          <button className='special-functions' onClick={this.absoluteValue}>|x|</button>
          <button className='operators' onClick={this.operators} value= '*'>*</button>
          <button className='numbers' onClick={this.numbers} value= {1}>1</button>
          <button className='numbers' onClick={this.zero} value= {0}>0</button>
        </div>
        <div className='seventh-row'>
          <button className='special-operators' onClick={this.pozneg}>+/-</button>
          <button className='special-operators' onClick={this.decimal} value= '.'>.</button>
          <button className='operators' onClick={this.operators} value= '/'>/</button>
          <button className='equals' onClick={this.equals}>=</button>
        </div>
      </div>
    </div>
  </div>
  <footer>This Calculator was created by: {this.props.creator}</footer>
  </> 
    );
  }
}
 
export default DetailedCalculator;
