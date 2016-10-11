var Schema = require('async-validate')
var form2js = require('form2js').form2js
var validator = require('email-validator')
var _ = require('lodash')
var processNameValues = require('../vendor/processNameValues')

Schema.plugin([
  require('async-validate/plugin/array'),
  require('async-validate/plugin/object'),
  require('async-validate/plugin/string'),
  require('async-validate/plugin/util')
])

module.exports = function (tag, formName) {
  formName = formName || 'form'
  tag.validators = {
    name: function (cb) {
      if (this.value && this.value.length < 3) {
        this.raise('%s is too short', this.field)
      }
      cb()
    },
    password: function (cb) {
      if (this.value && this.value.length < 6) {
        this.raise('%s is too short', this.field)
      }
      cb()
    },
    email: function (cb) {
      if (!validator.validate(this.value)) {
        this.raise('%s is not valid', this.field)
      }
      cb()
    }
  }
  tag.clearFlashMessages = function (fieldName) {
    var flashMessages = tag.root.querySelectorAll('[type="flash"]')
    for (var i = 0; i < flashMessages.length; i++) {
      var flashElement = flashMessages[i]
      if (flashElement.attributes.clearOnRevalidate) {
        flashElement.innerHTML = ''
        continue
      }
      if (fieldName) {
        if (flashElement.attributes.name.value === fieldName) {
          flashElement.innerHTML = ''
        }
      } else {
        flashElement.innerHTML = ''
      }
    }
  }

  tag.clearErrors = function (fieldName) {
    var errors = tag.root.querySelectorAll('[type="error"]')
    for (var i = 0; i < errors.length; i++) {
      var errElement = errors[i]
      if (errElement.attributes.clearOnRevalidate) {
        errElement.innerHTML = ''
        continue
      }
      if (fieldName) {
        if (errElement.attributes.name && errElement.attributes.name.value === fieldName) {
          errElement.innerHTML = ''
        }
      } else {
        errElement.innerHTML = ''
      }
    }
  }
  tag.hasValidationErrors = function (fieldName, done) {
    if (typeof fieldName === 'function') {
      done = fieldName
      fieldName = undefined
    }
    var descriptor = tag.getFormSchema(fieldName)
    var schema = new Schema(descriptor)
    var objValue = tag.getFormData(fieldName)
    schema.validate(objValue, function (err, res) {
      if (err) {
        return done(err)
      }
      if (res) {
        return done(null, res)
      }
      done()
    })
  }
  tag.getForm = function () {
    return tag.root.querySelector('[name=' + formName + ']')
  }
  tag.getFormData = function (fieldName) {
    var result = form2js(tag.getForm(), '.', false)
    if (!fieldName) {
      return result
    } else {
      var partialresult = {}
      _.set(partialresult, fieldName, _.get(result, fieldName))
      return partialresult
    }
  }
  tag.getFormSchema = function (fieldName) {
    var schemaFields = []
    var form = tag.getForm()
    for (var i = 0; i < form.elements.length; i++) {
      var element = form.elements[i]
      if (!element.attributes.name) continue
      if (fieldName && element.attributes.name.value !== fieldName) {
        continue
      }
      var elementName = element.attributes.name.value
      schemaFields.push({
        name: elementName,
        value: element
      })
    }
    var result = processNameValues(schemaFields, false, '.')
    result = tag.getValidationRules(result)
    return result
  }
  tag.getValidationRules = function (input) {
    var result
    var rules
    if (input.attributes) {
      var el = input
      result = []
      if (el.attributes.required) {
        result.push(function (cb) {
          if (!this.value) this.raise('%s is required', this.field)
          cb()
        })
      }
      if (el.type === 'text') {
        result.push({type: 'string'})
      }
      if (el.attributes.validator && el.attributes.validator.value !== 'null') {
        result.push(tag.validators[el.attributes.validator.value])
      }
      return result.length ? result : null
    } else {
      if (Array.isArray(input)) {
        result = {
          type: 'array',
          fields: {}
        }
        for (var i = 0; i < input.length; i++) {
          rules = tag.getValidationRules(input[i])
          if (rules) {
            result.fields[i] = rules
          }
        }
        return result
      } else {
        result = {
          type: 'object',
          fields: {}
        }
        for (var key in input) {
          rules = tag.getValidationRules(input[key])
          if (rules) {
            result.fields[key] = rules
          }
        }
        return result
      }
    }
  }
  tag.showErrors = function (result, focusFirstError) {
    if (focusFirstError !== false) {
      tag.getFieldTag(result.errors[0].field).focus()
    }
    for (var fieldName in result.fields) {
      var errs = result.fields[fieldName]
      var msg = errs.map(function (err) { return err.message }).join(' and ')
      var el = tag.getErrorTag(fieldName)
      if (el) {
        el.innerHTML = msg
      } else {
        throw new Error(msg)
      }
    }
  }
  tag.showApiErrors = function (errors) {
    var not_shown = []
    for (var fieldName in errors) {
      var el = tag.getErrorTag(fieldName)
      if (el) {
        el.innerHTML = errors[fieldName].message
      } else {
        not_shown.push({
          fieldName: fieldName,
          error: errors[fieldName]
        })
      }
    }
    if (not_shown.length === 0) return
    var errorsCombinedMsg = not_shown.map(function (item) {
      return item.error.message
    }).join(' and ')
    var base = tag.getErrorTag('base')
    if (base) {
      base.innerHTML += errorsCombinedMsg
    } else {
      window.alert(errorsCombinedMsg)
    }
  }
  tag.showError = function (fieldName, msg) {
    var el = tag.getErrorTag(fieldName)
    if (el) {
      el.innerHTML = msg
    } else {
      throw new Error(msg)
    }
  }
  tag.getErrorTag = function (fieldName) {
    return tag.root.querySelector('[name="' + fieldName + '"][type="error"]')
  }
  tag.getFieldTag = function (fieldName) {
    return tag.root.querySelector('[name="' + fieldName + '"]:not([type="error"])')
  }
  tag.revalidate = function (fieldName) {
    return function (e) {
      e.preventUpdate = true
      if (e.keyCode === 13) return
      tag.clearErrors(fieldName)
      tag.clearFlashMessages(fieldName)
      tag.hasValidationErrors(fieldName, function (err, result) {
        if (err) throw err
        if (result) {
          tag.showErrors(result, false)
        }
      })
    }
  }
  tag.turnDisabledForm = function (disable) {
    var submitBtn = this.root.querySelector('button[type="submit"]')
    var form = this.root.querySelector('form')

    submitBtn.disabled = disable
    if (disable) {
      // add loading class
      var parts = form.className.split(' ')
      parts.push('loading')
      form.className = parts.join(' ')
    } else {
      // remove loading class
      form.className = _.pull(form.className.split(' '), 'loading').join(' ')
    }
  }
  tag.validateAndSubmit = function (submitAction) {
    tag.clearErrors()
    tag.clearFlashMessages()
    tag.turnDisabledForm(true)
    tag.hasValidationErrors(function (err, result) {
      if (err) throw err
      if (result) {
        tag.showErrors(result)
        tag.turnDisabledForm(false)
      } else {
        submitAction().then((enableForm) => {
          if (enableForm) {
            tag.turnDisabledForm(false)
          }
        })
          .catch(function (err) {
            tag.turnDisabledForm(false)
            if (!err.response) throw err
            if (err.response.data.errors) {
              tag.showApiErrors(err.response.data.errors)
            } else {
              tag.showError('base', err.response.data)
            }
          })
      }
    })
  }
}
