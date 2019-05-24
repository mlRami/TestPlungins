graph.addMouseListener(
{
    currentState: null,
    previousFill: null,
    mouseDown: function(sender, me)
    {
        if (this.currentState != null)
        {
                this.dragLeave(me.getEvent(), this.currentState);
                this.currentState = null;
        }
    },
    mouseMove: function(sender, me)
    {
        if (this.currentState != null && me.getState() == this.currentState)
        {
            return;
        }

        var tmp = graph.view.getState(me.getCell());

        // Ignores everything but vertices
        if (graph.isMouseDown || (tmp != null && !
            graph.getModel().isVertex(tmp.cell)))
        {
            tmp = null;
        }

        if (tmp != this.currentState)
        {
            if (this.currentState != null)
            {
                this.dragLeave(me.getEvent(), this.currentState);
            }

            this.currentState = tmp;

            if (this.currentState != null)
            {
                this.dragEnter(me.getEvent(), this.currentState);
            }
        }
    },
    mouseUp: function(sender, me) { },
    dragEnter: function(evt, state)
    {
        if (state != null)
        {
          this.previousFill = state.shape.fill;
          state.shape.fill = 'red';
          state.shape.reconfigure();
        }
    },
    dragLeave: function(evt, state)
    {
        if (state != null)
        {
          state.shape.fill = this.previousFill;
          state.shape.reconfigure();
        }
    }
});
