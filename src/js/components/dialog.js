!(function (t, e) {
	'object' == typeof exports && 'undefined' != typeof module
		? (module.exports = e())
		: 'function' == typeof define && define.amd
		? define(e)
		: ((t =
				'undefined' != typeof globalThis
					? globalThis
					: t || self).A11yDialog = e())
})(this, function () {
	'use strict'
	var t = [
		'a[href]:not([tabindex^="-"])',
		'area[href]:not([tabindex^="-"])',
		'input:not([type="hidden"]):not([type="radio"]):not([disabled]):not([tabindex^="-"])',
		'input[type="radio"]:not([disabled]):not([tabindex^="-"])',
		'select:not([disabled]):not([tabindex^="-"])',
		'textarea:not([disabled]):not([tabindex^="-"])',
		'button:not([disabled]):not([tabindex^="-"])',
		'iframe:not([tabindex^="-"])',
		'audio[controls]:not([tabindex^="-"])',
		'video[controls]:not([tabindex^="-"])',
		'[contenteditable]:not([tabindex^="-"])',
		'[tabindex]:not([tabindex^="-"])'
	]

	function e(t) {
		;(this._show = this.show.bind(this)),
			(this._hide = this.hide.bind(this)),
			(this._maintainFocus = this._maintainFocus.bind(this)),
			(this._bindKeypress = this._bindKeypress.bind(this)),
			(this.$el = t),
			(this.shown = !1),
			(this._id =
				this.$el.getAttribute('data-a11y-dialog') || this.$el.id),
			(this._previouslyFocused = null),
			(this._listeners = {}),
			this.create()
	}

	function i(t, e) {
		return (
			(i = (e || document).querySelectorAll(t)),
			Array.prototype.slice.call(i)
		)
		var i
	}

	function n(t) {
		;(t.querySelector('[autofocus]') || t).focus()
	}

	function s() {
		i('[data-a11y-dialog]').forEach(function (t) {
			new e(t)
		})
	}
	return (
		(e.prototype.create = function () {
			this.$el.setAttribute('aria-hidden', !0),
				this.$el.setAttribute('aria-modal', !0),
				this.$el.setAttribute('tabindex', -1),
				this.$el.hasAttribute('role') ||
					this.$el.setAttribute('role', 'dialog'),
				(this._openers = i(
					'[data-a11y-dialog-show="' + this._id + '"]'
				)),
				this._openers.forEach(
					function (t) {
						t.addEventListener('click', this._show)
					}.bind(this)
				)
			const t = this.$el
			return (
				(this._closers = i('[data-a11y-dialog-hide]', this.$el)
					.filter(function (e) {
						return (
							e.closest(
								'[aria-modal="true"], [data-a11y-dialog]'
							) === t
						)
					})
					.concat(i('[data-a11y-dialog-hide="' + this._id + '"]'))),
				this._closers.forEach(
					function (t) {
						t.addEventListener('click', this._hide)
					}.bind(this)
				),
				this._fire('create'),
				this
			)
		}),
		(e.prototype.show = function (t) {
			return (
				this.shown ||
					((document.documentElement.style.overflowY = 'hidden'),
					(this._previouslyFocused = document.activeElement),
					this.$el.removeAttribute('aria-hidden'),
					(this.shown = !0),
					n(this.$el),
					document.body.addEventListener(
						'focus',
						this._maintainFocus,
						!0
					),
					document.addEventListener('keydown', this._bindKeypress),
					this._fire('show', t)),
				this
			)
		}),
		(e.prototype.hide = function (t) {
			return this.shown
				? ((document.documentElement.style.overflowY = ''),
				  (this.shown = !1),
				  this.$el.setAttribute('aria-hidden', 'true'),
				  this._previouslyFocused &&
						this._previouslyFocused.focus &&
						this._previouslyFocused.focus(),
				  document.body.removeEventListener(
						'focus',
						this._maintainFocus,
						!0
				  ),
				  document.removeEventListener('keydown', this._bindKeypress),
				  this._fire('hide', t),
				  this)
				: this
		}),
		(e.prototype.destroy = function () {
			return (
				this.hide(),
				this._openers.forEach(
					function (t) {
						t.removeEventListener('click', this._show)
					}.bind(this)
				),
				this._closers.forEach(
					function (t) {
						t.removeEventListener('click', this._hide)
					}.bind(this)
				),
				this._fire('destroy'),
				(this._listeners = {}),
				this
			)
		}),
		(e.prototype.on = function (t, e) {
			return (
				void 0 === this._listeners[t] && (this._listeners[t] = []),
				this._listeners[t].push(e),
				this
			)
		}),
		(e.prototype.off = function (t, e) {
			var i = (this._listeners[t] || []).indexOf(e)
			return i > -1 && this._listeners[t].splice(i, 1), this
		}),
		(e.prototype._fire = function (t, e) {
			var i = this._listeners[t] || [],
				n = new CustomEvent(t, {
					detail: e
				})
			this.$el.dispatchEvent(n),
				i.forEach(
					function (t) {
						t(this.$el, e)
					}.bind(this)
				)
		}),
		(e.prototype._bindKeypress = function (e) {
			const n = document.activeElement
			;(n && n.closest('[aria-modal="true"]') !== this.$el) ||
				(this.shown &&
					'Escape' === e.key &&
					'alertdialog' !== this.$el.getAttribute('role') &&
					(e.preventDefault(), this.hide(e)),
				this.shown &&
					'Tab' === e.key &&
					(function (e, n) {
						var s = (function (e) {
								return i(t.join(','), e).filter(function (t) {
									return !!(
										t.offsetWidth ||
										t.offsetHeight ||
										t.getClientRects().length
									)
								})
							})(e),
							o = s.indexOf(document.activeElement)
						n.shiftKey && 0 === o
							? (s[s.length - 1].focus(), n.preventDefault())
							: n.shiftKey ||
							  o !== s.length - 1 ||
							  (s[0].focus(), n.preventDefault())
					})(this.$el, e))
		}),
		(e.prototype._maintainFocus = function (t) {
			!this.shown ||
				t.target.closest('[aria-modal="true"]') ||
				t.target.closest('[data-a11y-dialog-ignore-focus-trap]') ||
				n(this.$el)
		}),
		'undefined' != typeof document &&
			('loading' === document.readyState
				? document.addEventListener('DOMContentLoaded', s)
				: window.requestAnimationFrame
				? window.requestAnimationFrame(s)
				: window.setTimeout(s, 16)),
		e
	)
})
