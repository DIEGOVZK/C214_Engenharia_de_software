
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function to_number(value) {
        return value === '' ? null : +value;
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    let render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = /* @__PURE__ */ Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        // Do not reenter flush while dirty components are updated, as this can
        // result in an infinite loop. Instead, let the inner flush handle it.
        // Reentrancy is ok afterwards for bindings etc.
        if (flushidx !== 0) {
            return;
        }
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            try {
                while (flushidx < dirty_components.length) {
                    const component = dirty_components[flushidx];
                    flushidx++;
                    set_current_component(component);
                    update(component.$$);
                }
            }
            catch (e) {
                // reset dirty state to not end up in a deadlocked state and then rethrow
                dirty_components.length = 0;
                flushidx = 0;
                throw e;
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    /**
     * Useful for example to execute remaining `afterUpdate` callbacks before executing `destroy`.
     */
    function flush_render_callbacks(fns) {
        const filtered = [];
        const targets = [];
        render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
        targets.forEach((c) => c());
        render_callbacks = filtered;
    }
    const outroing = new Set();
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
                // if the component was destroyed immediately
                // it will update the `$$.on_destroy` reference to `null`.
                // the destructured on_destroy may still reference to the old array
                if (component.$$.on_destroy) {
                    component.$$.on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            flush_render_callbacks($$.after_update);
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: [],
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            if (!is_function(callback)) {
                return noop;
            }
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.59.2' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation, has_stop_immediate_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        if (has_stop_immediate_propagation)
            modifiers.push('stopImmediatePropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.data === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src\app.svelte generated by Svelte v3.59.2 */

    const file = "src\\app.svelte";

    // (46:8) {:else}
    function create_else_block(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "-";
    			add_location(p, file, 46, 12, 1574);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(46:8) {:else}",
    		ctx
    	});

    	return block;
    }

    // (44:8) {#if imc > 0}
    function create_if_block(ctx) {
    	let p;
    	let t0;
    	let t1;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t0 = text("Seu IMC é ");
    			t1 = text(/*imc*/ ctx[2]);
    			add_location(p, file, 44, 12, 1521);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t0);
    			append_dev(p, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*imc*/ 4) set_data_dev(t1, /*imc*/ ctx[2]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(44:8) {#if imc > 0}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let main;
    	let div;
    	let h1;
    	let t1;
    	let label0;
    	let t2;
    	let input0;
    	let t3;
    	let label1;
    	let t4;
    	let input1;
    	let t5;
    	let t6;
    	let table;
    	let thead;
    	let tr0;
    	let th0;
    	let t8;
    	let th1;
    	let t10;
    	let tbody;
    	let tr1;
    	let td0;
    	let t12;
    	let td1;
    	let t14;
    	let tr2;
    	let td2;
    	let t16;
    	let td3;
    	let t18;
    	let tr3;
    	let td4;
    	let t20;
    	let td5;
    	let t22;
    	let tr4;
    	let td6;
    	let t24;
    	let td7;
    	let t26;
    	let tr5;
    	let td8;
    	let t28;
    	let td9;
    	let t30;
    	let tr6;
    	let td10;
    	let t32;
    	let td11;
    	let mounted;
    	let dispose;

    	function select_block_type(ctx, dirty) {
    		if (/*imc*/ ctx[2] > 0) return create_if_block;
    		return create_else_block;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			main = element("main");
    			div = element("div");
    			h1 = element("h1");
    			h1.textContent = "Calculadora de IMC";
    			t1 = space();
    			label0 = element("label");
    			t2 = text("Peso (kg):\r\n            ");
    			input0 = element("input");
    			t3 = space();
    			label1 = element("label");
    			t4 = text("Altura (m):\r\n            ");
    			input1 = element("input");
    			t5 = space();
    			if_block.c();
    			t6 = space();
    			table = element("table");
    			thead = element("thead");
    			tr0 = element("tr");
    			th0 = element("th");
    			th0.textContent = "IMC";
    			t8 = space();
    			th1 = element("th");
    			th1.textContent = "Classificação";
    			t10 = space();
    			tbody = element("tbody");
    			tr1 = element("tr");
    			td0 = element("td");
    			td0.textContent = "menor que 18,5";
    			t12 = space();
    			td1 = element("td");
    			td1.textContent = "Abaixo do peso";
    			t14 = space();
    			tr2 = element("tr");
    			td2 = element("td");
    			td2.textContent = "18,5 a 24,9";
    			t16 = space();
    			td3 = element("td");
    			td3.textContent = "Peso ideal (parabéns)";
    			t18 = space();
    			tr3 = element("tr");
    			td4 = element("td");
    			td4.textContent = "25,0 a 29,9";
    			t20 = space();
    			td5 = element("td");
    			td5.textContent = "Levemente acima do peso";
    			t22 = space();
    			tr4 = element("tr");
    			td6 = element("td");
    			td6.textContent = "30,0 a 34,9";
    			t24 = space();
    			td7 = element("td");
    			td7.textContent = "Obesidade grau I";
    			t26 = space();
    			tr5 = element("tr");
    			td8 = element("td");
    			td8.textContent = "35,0 a 39,9";
    			t28 = space();
    			td9 = element("td");
    			td9.textContent = "Obesidade grau II (severa)";
    			t30 = space();
    			tr6 = element("tr");
    			td10 = element("td");
    			td10.textContent = "maior que 40";
    			t32 = space();
    			td11 = element("td");
    			td11.textContent = "Obesidade III (mórbida)";
    			attr_dev(h1, "class", "svelte-3ix126");
    			add_location(h1, file, 34, 8, 1180);
    			attr_dev(input0, "type", "number");
    			attr_dev(input0, "class", "svelte-3ix126");
    			add_location(input0, file, 37, 12, 1262);
    			attr_dev(label0, "class", "svelte-3ix126");
    			add_location(label0, file, 35, 8, 1217);
    			attr_dev(input1, "type", "number");
    			attr_dev(input1, "class", "svelte-3ix126");
    			add_location(input1, file, 41, 12, 1400);
    			attr_dev(label1, "class", "svelte-3ix126");
    			add_location(label1, file, 39, 8, 1354);
    			attr_dev(div, "class", "imc-calculator svelte-3ix126");
    			add_location(div, file, 33, 4, 1142);
    			attr_dev(th0, "class", "svelte-3ix126");
    			add_location(th0, file, 53, 16, 1677);
    			attr_dev(th1, "class", "svelte-3ix126");
    			add_location(th1, file, 54, 16, 1707);
    			attr_dev(tr0, "class", "svelte-3ix126");
    			add_location(tr0, file, 52, 12, 1655);
    			add_location(thead, file, 51, 8, 1634);
    			attr_dev(td0, "class", "svelte-3ix126");
    			add_location(td0, file, 59, 16, 1819);
    			attr_dev(td1, "class", "svelte-3ix126");
    			add_location(td1, file, 60, 16, 1860);
    			attr_dev(tr1, "class", "svelte-3ix126");
    			add_location(tr1, file, 58, 12, 1797);
    			attr_dev(td2, "class", "svelte-3ix126");
    			add_location(td2, file, 63, 16, 1938);
    			attr_dev(td3, "class", "svelte-3ix126");
    			add_location(td3, file, 64, 16, 1976);
    			attr_dev(tr2, "class", "svelte-3ix126");
    			add_location(tr2, file, 62, 12, 1916);
    			attr_dev(td4, "class", "svelte-3ix126");
    			add_location(td4, file, 67, 16, 2061);
    			attr_dev(td5, "class", "svelte-3ix126");
    			add_location(td5, file, 68, 16, 2099);
    			attr_dev(tr3, "class", "svelte-3ix126");
    			add_location(tr3, file, 66, 12, 2039);
    			attr_dev(td6, "class", "svelte-3ix126");
    			add_location(td6, file, 71, 16, 2186);
    			attr_dev(td7, "class", "svelte-3ix126");
    			add_location(td7, file, 72, 16, 2224);
    			attr_dev(tr4, "class", "svelte-3ix126");
    			add_location(tr4, file, 70, 12, 2164);
    			attr_dev(td8, "class", "svelte-3ix126");
    			add_location(td8, file, 75, 16, 2304);
    			attr_dev(td9, "class", "svelte-3ix126");
    			add_location(td9, file, 76, 16, 2342);
    			attr_dev(tr5, "class", "svelte-3ix126");
    			add_location(tr5, file, 74, 12, 2282);
    			attr_dev(td10, "class", "svelte-3ix126");
    			add_location(td10, file, 79, 16, 2432);
    			attr_dev(td11, "class", "svelte-3ix126");
    			add_location(td11, file, 80, 16, 2471);
    			attr_dev(tr6, "class", "svelte-3ix126");
    			add_location(tr6, file, 78, 12, 2410);
    			add_location(tbody, file, 57, 8, 1776);
    			attr_dev(table, "class", "svelte-3ix126");
    			add_location(table, file, 50, 4, 1617);
    			attr_dev(main, "class", "svelte-3ix126");
    			add_location(main, file, 32, 0, 1130);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, div);
    			append_dev(div, h1);
    			append_dev(div, t1);
    			append_dev(div, label0);
    			append_dev(label0, t2);
    			append_dev(label0, input0);
    			set_input_value(input0, /*peso*/ ctx[0]);
    			append_dev(div, t3);
    			append_dev(div, label1);
    			append_dev(label1, t4);
    			append_dev(label1, input1);
    			set_input_value(input1, /*altura*/ ctx[1]);
    			append_dev(div, t5);
    			if_block.m(div, null);
    			append_dev(main, t6);
    			append_dev(main, table);
    			append_dev(table, thead);
    			append_dev(thead, tr0);
    			append_dev(tr0, th0);
    			append_dev(tr0, t8);
    			append_dev(tr0, th1);
    			append_dev(table, t10);
    			append_dev(table, tbody);
    			append_dev(tbody, tr1);
    			append_dev(tr1, td0);
    			append_dev(tr1, t12);
    			append_dev(tr1, td1);
    			append_dev(tbody, t14);
    			append_dev(tbody, tr2);
    			append_dev(tr2, td2);
    			append_dev(tr2, t16);
    			append_dev(tr2, td3);
    			append_dev(tbody, t18);
    			append_dev(tbody, tr3);
    			append_dev(tr3, td4);
    			append_dev(tr3, t20);
    			append_dev(tr3, td5);
    			append_dev(tbody, t22);
    			append_dev(tbody, tr4);
    			append_dev(tr4, td6);
    			append_dev(tr4, t24);
    			append_dev(tr4, td7);
    			append_dev(tbody, t26);
    			append_dev(tbody, tr5);
    			append_dev(tr5, td8);
    			append_dev(tr5, t28);
    			append_dev(tr5, td9);
    			append_dev(tbody, t30);
    			append_dev(tbody, tr6);
    			append_dev(tr6, td10);
    			append_dev(tr6, t32);
    			append_dev(tr6, td11);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input0, "input", /*input0_input_handler*/ ctx[4]),
    					listen_dev(input0, "input", /*calcularIMC*/ ctx[3], false, false, false, false),
    					listen_dev(input1, "input", /*input1_input_handler*/ ctx[5]),
    					listen_dev(input1, "input", /*calcularIMC*/ ctx[3], false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*peso*/ 1 && to_number(input0.value) !== /*peso*/ ctx[0]) {
    				set_input_value(input0, /*peso*/ ctx[0]);
    			}

    			if (dirty & /*altura*/ 2 && to_number(input1.value) !== /*altura*/ ctx[1]) {
    				set_input_value(input1, /*altura*/ ctx[1]);
    			}

    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(div, null);
    				}
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			if_block.d();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	let peso = 0; // Peso do usuário
    	let altura = 0; // Altura do usuário
    	let imc = 0; // Índice de Massa Corporal
    	let classificacao = ""; // Classificação do IMC

    	// Função para calcular o IMC e a classificação
    	function calcularIMC() {
    		if (peso > 0 && altura > 0) {
    			$$invalidate(2, imc = (peso / Math.pow(altura, 2)).toFixed(2));

    			if (imc < 18.5) {
    				classificacao = "Abaixo do peso";
    			} else if (imc >= 18.5 && imc <= 24.9) {
    				classificacao = "Peso ideal (parabéns)";
    			} else if (imc >= 25 && imc <= 29.9) {
    				classificacao = "Levemente acima do peso";
    			} else if (imc >= 30 && imc <= 34.9) {
    				classificacao = "Obesidade grau I";
    			} else if (imc >= 35 && imc <= 39.9) {
    				classificacao = "Obesidade grau II (severa)";
    			} else {
    				classificacao = "Obesidade III (mórbida)";
    			}
    		} else {
    			$$invalidate(2, imc = 0);
    			classificacao = "";
    		}
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	function input0_input_handler() {
    		peso = to_number(this.value);
    		$$invalidate(0, peso);
    	}

    	function input1_input_handler() {
    		altura = to_number(this.value);
    		$$invalidate(1, altura);
    	}

    	$$self.$capture_state = () => ({
    		peso,
    		altura,
    		imc,
    		classificacao,
    		calcularIMC
    	});

    	$$self.$inject_state = $$props => {
    		if ('peso' in $$props) $$invalidate(0, peso = $$props.peso);
    		if ('altura' in $$props) $$invalidate(1, altura = $$props.altura);
    		if ('imc' in $$props) $$invalidate(2, imc = $$props.imc);
    		if ('classificacao' in $$props) classificacao = $$props.classificacao;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [peso, altura, imc, calcularIMC, input0_input_handler, input1_input_handler];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    		name: 'imc-diego'
    	}
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
